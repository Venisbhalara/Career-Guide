import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminCareers.css";

const LIMIT = 12;

const FIELDS = [
  "IT",
  "Business",
  "Arts",
  "Healthcare",
  "Engineering",
  "Law",
  "Science",
  "Education",
  "Finance",
  "Other",
];

const BLANK_FORM = {
  title: "",
  field: "",
  description: "",
  detailed_description: "",
  avg_salary_min: "",
  avg_salary_max: "",
  education_required: "",
  job_outlook: "",
  future_scope: "",
};

const OUTLOOK_OPTIONS = [
  "Excellent",
  "Very Good",
  "Good",
  "Average",
  "Declining",
];

// ── Skeleton card ──────────────────────────────────────
const SkeletonCard = () => (
  <div className="career-card-skeleton">
    <div className="sk-line" style={{ height: 14, width: "40%" }} />
    <div className="sk-line" style={{ height: 18, width: "75%" }} />
    <div className="sk-line" style={{ height: 12, width: "90%" }} />
    <div className="sk-line" style={{ height: 12, width: "60%" }} />
  </div>
);

// ── Salary formatter ───────────────────────────────────
const fmtSalary = (n) => {
  if (!n) return "—";
  const num = Number(n);
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  return `₹${(num / 1000).toFixed(0)}K`;
};

// ── Main Component ─────────────────────────────────────
const AdminCareers = () => {
  const [careers, setCareers] = useState([]);
  const [fields, setFields] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = add mode
  const [form, setForm] = useState(BLANK_FORM);
  const [formErrors, setFormErrors] = useState({});
  const searchTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch careers ──
  const fetchCareers = useCallback(
    async (page = 1, q = search, f = fieldFilter) => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/careers", {
          params: { page, limit: LIMIT, search: q, field: f },
        });
        setCareers(data.careers);
        setFields(data.fields || []);
        setPagination(data.pagination);
      } catch {
        showToast("Failed to load careers", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, fieldFilter],
  );

  useEffect(() => {
    fetchCareers(1);
  }, [fieldFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => fetchCareers(1, val, fieldFilter),
      400,
    );
  };

  // ── Open modal ──
  const openAddModal = () => {
    setEditingId(null);
    setForm(BLANK_FORM);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = async (career) => {
    setEditingId(career.id);
    setFormErrors({});
    setModalOpen(true);
    // Fetch full career data (includes roadmap, detailed description, etc.)
    try {
      const { data } = await api.get(`/admin/careers/${career.id}`);
      const c = data.career;
      setForm({
        title: c.title || "",
        field: c.field || "",
        description: c.description || "",
        detailed_description: c.detailed_description || "",
        avg_salary_min: c.avg_salary_min || "",
        avg_salary_max: c.avg_salary_max || "",
        education_required: c.education_required || "",
        job_outlook: c.job_outlook || "",
        future_scope: c.future_scope || "",
      });
    } catch {
      showToast("Failed to load career details", "error");
      setModalOpen(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(BLANK_FORM);
    setFormErrors({});
  };

  // ── Form field change ──
  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Validation ──
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.field) errs.field = "Field is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.avg_salary_min && form.avg_salary_max) {
      if (Number(form.avg_salary_min) > Number(form.avg_salary_max))
        errs.avg_salary_min = "Min salary cannot exceed max";
    }
    return errs;
  };

  // ── Save (add or update) ──
  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      avg_salary_min: form.avg_salary_min ? Number(form.avg_salary_min) : null,
      avg_salary_max: form.avg_salary_max ? Number(form.avg_salary_max) : null,
    };

    try {
      if (editingId) {
        await api.put(`/admin/careers/${editingId}`, payload);
        showToast("Career updated successfully");
      } else {
        await api.post("/admin/careers", payload);
        showToast("Career added successfully");
      }
      closeModal();
      fetchCareers(pagination.page, search, fieldFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to save career", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/careers/${deleteTarget.id}`);
      showToast(`"${deleteTarget.title}" deleted`);
      setDeleteTarget(null);
      fetchCareers(pagination.page, search, fieldFilter);
    } catch (err) {
      showToast(
        err.response?.data?.error || "Failed to delete career",
        "error",
      );
    }
  };

  // ── Pagination ──
  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );

  return (
    <AdminLayout title="Career Management">
      {/* Toolbar */}
      <p className="admin-section-title">All Careers</p>
      <div className="careers-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search by title or description…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <select
          className="admin-filter-select"
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
        >
          <option value="">All Fields</option>
          {(fields.length ? fields : FIELDS).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {!loading && (
          <span className="careers-count">
            {pagination.total} career{pagination.total !== 1 ? "s" : ""}
          </span>
        )}

        <button className="btn-add-career" onClick={openAddModal}>
          + Add Career
        </button>
      </div>

      {/* Cards Grid */}
      <div className="careers-grid">
        {loading ? (
          Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />)
        ) : careers.length === 0 ? (
          <div className="careers-empty">
            <div className="careers-empty-icon">🎯</div>
            <p>No careers found{search ? ` for "${search}"` : ""}.</p>
            <button className="btn-add-career" onClick={openAddModal}>
              + Add First Career
            </button>
          </div>
        ) : (
          careers.map((career) => (
            <div key={career.id} className="career-card">
              <div className="career-card-header">
                <div className="career-card-title">{career.title}</div>
                <span className="career-field-pill">{career.field}</span>
              </div>

              <p className="career-card-desc">{career.description}</p>

              <div className="career-card-meta">
                {career.avg_salary_min && (
                  <span className="career-meta-tag">
                    💰 {fmtSalary(career.avg_salary_min)}–
                    {fmtSalary(career.avg_salary_max)}
                  </span>
                )}
                {career.job_outlook && (
                  <span className="career-meta-tag">
                    📈 {career.job_outlook}
                  </span>
                )}
                {career.education_required && (
                  <span className="career-meta-tag">
                    🎓 {career.education_required}
                  </span>
                )}
              </div>

              <div className="career-card-actions">
                <button
                  className="career-action-btn edit"
                  onClick={() => openEditModal(career)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="career-action-btn delete"
                  onClick={() => setDeleteTarget(career)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="careers-pagination">
          <span className="admin-pagination-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <div className="admin-pagination-btns">
            <button
              className="page-btn"
              disabled={pagination.page === 1}
              onClick={() => fetchCareers(pagination.page - 1)}
            >
              ‹
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`page-btn ${n === pagination.page ? "active" : ""}`}
                onClick={() => fetchCareers(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => fetchCareers(pagination.page + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="career-modal-overlay" onClick={closeModal}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()}>
            <div className="career-modal-header">
              <h2>{editingId ? "Edit Career" : "Add New Career"}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="career-modal-body">
              {/* Row 1: Title + Field */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Title <span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    name="title"
                    placeholder="e.g. Software Developer"
                    value={form.title}
                    onChange={handleField}
                    style={formErrors.title ? { borderColor: "#dc2626" } : {}}
                  />
                  {formErrors.title && (
                    <span className="form-hint" style={{ color: "#dc2626" }}>
                      {formErrors.title}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Field <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="field"
                    value={form.field}
                    onChange={handleField}
                    style={formErrors.field ? { borderColor: "#dc2626" } : {}}
                  >
                    <option value="">Select field…</option>
                    {FIELDS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  {formErrors.field && (
                    <span className="form-hint" style={{ color: "#dc2626" }}>
                      {formErrors.field}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Short description */}
              <div className="form-group full">
                <label className="form-label">
                  Short Description <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  name="description"
                  rows={2}
                  placeholder="Brief overview of the career (1–2 sentences)"
                  value={form.description}
                  onChange={handleField}
                  style={
                    formErrors.description ? { borderColor: "#dc2626" } : {}
                  }
                />
                {formErrors.description && (
                  <span className="form-hint" style={{ color: "#dc2626" }}>
                    {formErrors.description}
                  </span>
                )}
              </div>

              {/* Row 3: Detailed description */}
              <div className="form-group full">
                <label className="form-label">Detailed Description</label>
                <textarea
                  className="form-textarea"
                  name="detailed_description"
                  rows={3}
                  placeholder="In-depth description of the career, responsibilities, day-to-day work…"
                  value={form.detailed_description}
                  onChange={handleField}
                />
              </div>

              {/* Row 4: Salary */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Min Salary (₹/year)</label>
                  <input
                    className="form-input"
                    name="avg_salary_min"
                    type="number"
                    placeholder="e.g. 400000"
                    value={form.avg_salary_min}
                    onChange={handleField}
                    style={
                      formErrors.avg_salary_min
                        ? { borderColor: "#dc2626" }
                        : {}
                    }
                  />
                  {formErrors.avg_salary_min && (
                    <span className="form-hint" style={{ color: "#dc2626" }}>
                      {formErrors.avg_salary_min}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Max Salary (₹/year)</label>
                  <input
                    className="form-input"
                    name="avg_salary_max"
                    type="number"
                    placeholder="e.g. 1500000"
                    value={form.avg_salary_max}
                    onChange={handleField}
                  />
                </div>
              </div>

              {/* Row 5: Education + Outlook */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Education Required</label>
                  <input
                    className="form-input"
                    name="education_required"
                    placeholder="e.g. B.Tech in Computer Science"
                    value={form.education_required}
                    onChange={handleField}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Outlook</label>
                  <select
                    className="form-select"
                    name="job_outlook"
                    value={form.job_outlook}
                    onChange={handleField}
                  >
                    <option value="">Select outlook…</option>
                    {OUTLOOK_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Future scope */}
              <div className="form-group full">
                <label className="form-label">Future Scope</label>
                <textarea
                  className="form-textarea"
                  name="future_scope"
                  rows={2}
                  placeholder="Growth opportunities, industry trends, emerging technologies…"
                  value={form.future_scope}
                  onChange={handleField}
                />
              </div>
            </div>

            <div className="career-modal-footer">
              <button className="btn-modal-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn-modal-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving…" : editingId ? "Save Changes" : "Add Career"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-icon">🗑️</div>
            <h3>Delete Career?</h3>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>&quot;{deleteTarget.title}&quot;</strong>?
              <br />
              This action cannot be undone.
            </p>
            <div className="admin-modal-btns">
              <button
                className="btn-cancel"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn-confirm-delete"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCareers;
