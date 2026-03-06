import { useState, useEffect, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminAssessments.css";

const TYPES = ["interest", "personality", "aptitude"];

const TYPE_LABELS = {
  interest: { label: "Interest", icon: "💡" },
  personality: { label: "Personality", icon: "🧠" },
  aptitude: { label: "Aptitude", icon: "📐" },
};

const BLANK_FORM = {
  question_text: "",
  question_type: "interest",
  category: "",
  options: [
    { text: "Not at all", score: 0 },
    { text: "Somewhat", score: 2 },
    { text: "Moderately", score: 5 },
    { text: "Very much", score: 8 },
    { text: "Extremely", score: 10 },
  ],
};

// ─── Skeleton ───────────────────────────────────────────
const SkeletonCard = () => (
  <div className="question-card-skeleton">
    <div className="sk-line" style={{ height: 13, width: "30%" }} />
    <div className="sk-line" style={{ height: 18, width: "85%" }} />
    <div className="sk-line" style={{ height: 11, width: "55%" }} />
  </div>
);

// ─── Main Component ─────────────────────────────────────
const AdminAssessments = () => {
  const [questions, setQuestions] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});
  const [submittedUsers, setSubmittedUsers] = useState(0);
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch ──
  const fetchQuestions = async (type = "") => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/assessments", {
        params: { type: type === "all" ? "" : type },
      });
      setQuestions(data.questions);
      setSubmittedUsers(data.submittedUsers);
      // Build typeCounts map
      const counts = {};
      data.typeCounts.forEach((t) => {
        counts[t.question_type] = Number(t.count);
      });
      setTypeCounts(counts);
    } catch {
      showToast("Failed to load questions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(activeType);
  }, [activeType]);

  // Client-side search filter
  const filtered = search.trim()
    ? questions.filter(
        (q) =>
          q.question_text.toLowerCase().includes(search.toLowerCase()) ||
          q.category?.toLowerCase().includes(search.toLowerCase()),
      )
    : questions;

  // ── Modal open/close ──
  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...BLANK_FORM,
      question_type: activeType === "all" ? "interest" : activeType,
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingId(q.id);
    const opts = Array.isArray(q.options) ? q.options : [];
    const weights = q.scoring_weights || {};
    setForm({
      question_text: q.question_text,
      question_type: q.question_type,
      category: q.category || "",
      options: opts.map((o) => ({
        text: typeof o === "string" ? o : o,
        score: weights[typeof o === "string" ? o : o] ?? 0,
      })),
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(BLANK_FORM);
    setFormErrors({});
  };

  // ── Form helpers ──
  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (formErrors[name]) setFormErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleOptionText = (i, val) => {
    setForm((p) => {
      const opts = [...p.options];
      opts[i] = { ...opts[i], text: val };
      return { ...p, options: opts };
    });
  };

  const handleOptionScore = (i, val) => {
    setForm((p) => {
      const opts = [...p.options];
      opts[i] = { ...opts[i], score: Number(val) };
      return { ...p, options: opts };
    });
  };

  const addOption = () => {
    setForm((p) => ({
      ...p,
      options: [...p.options, { text: "", score: 0 }],
    }));
  };

  const removeOption = (i) => {
    setForm((p) => ({
      ...p,
      options: p.options.filter((_, idx) => idx !== i),
    }));
  };

  // Build options array and scoring_weights from form state
  const buildPayload = () => {
    const opts = form.options.map((o) => o.text).filter(Boolean);
    const weights = {};
    form.options.forEach((o) => {
      if (o.text) weights[o.text] = o.score;
    });
    return {
      question_text: form.question_text.trim(),
      question_type: form.question_type,
      category: form.category.trim() || null,
      options: opts,
      scoring_weights: weights,
    };
  };

  // ── Validation ──
  const validate = () => {
    const errs = {};
    if (!form.question_text.trim())
      errs.question_text = "Question text is required";
    if (!form.question_type) errs.question_type = "Type is required";
    if (form.options.some((o) => !o.text.trim()))
      errs.options = "All option labels must be filled";
    return errs;
  };

  // ── Save ──
  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }

    setSaving(true);
    const payload = buildPayload();
    try {
      if (editingId) {
        await api.put(`/admin/assessments/${editingId}`, payload);
        showToast("Question updated");
      } else {
        await api.post("/admin/assessments", payload);
        showToast("Question added");
      }
      closeModal();
      fetchQuestions(activeType);
    } catch (err) {
      showToast(
        err.response?.data?.error || "Failed to save question",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/assessments/${deleteTarget.id}`);
      showToast("Question deleted");
      setDeleteTarget(null);
      fetchQuestions(activeType);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to delete", "error");
    }
  };

  const totalQuestions = Object.values(typeCounts).reduce((s, n) => s + n, 0);

  return (
    <AdminLayout title="Assessment Management">
      {/* ── Stats ── */}
      <p className="admin-section-title">Overview</p>
      <div className="assessment-stats">
        {TYPES.map((t) => (
          <div key={t} className="assessment-stat-card">
            <div className={`astat-icon ${t}`}>{TYPE_LABELS[t].icon}</div>
            <div>
              <div className="astat-val">
                {loading ? "—" : (typeCounts[t] ?? 0)}
              </div>
              <div className="astat-label">{TYPE_LABELS[t].label}</div>
            </div>
          </div>
        ))}
        <div className="assessment-stat-card">
          <div className="astat-icon users">👥</div>
          <div>
            <div className="astat-val">{loading ? "—" : submittedUsers}</div>
            <div className="astat-label">Users Tested</div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <p className="admin-section-title">Questions</p>
      <div className="assessment-toolbar">
        {/* Type tabs */}
        <div className="type-tab-group">
          <button
            className={`type-tab ${activeType === "all" ? "active" : ""}`}
            onClick={() => setActiveType("all")}
          >
            All ({totalQuestions})
          </button>
          {TYPES.map((t) => (
            <button
              key={t}
              className={`type-tab ${activeType === t ? "active" : ""}`}
              onClick={() => setActiveType(t)}
            >
              {TYPE_LABELS[t].icon} {TYPE_LABELS[t].label} ({typeCounts[t] ?? 0}
              )
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className="q-count-badge">
          {filtered.length} question{filtered.length !== 1 ? "s" : ""}
        </span>

        <button className="btn-add-question" onClick={openAddModal}>
          + Add Question
        </button>
      </div>

      {/* ── Questions List ── */}
      <div className="questions-list">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="assessment-empty">
            <div className="assessment-empty-icon">📋</div>
            <p>No questions found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          filtered.map((q, idx) => (
            <div key={q.id} className="question-card">
              <div className="q-number">{idx + 1}</div>
              <div className="q-body">
                <div className="q-text">{q.question_text}</div>
                <div className="q-meta">
                  <span className={`q-type-pill ${q.question_type}`}>
                    {TYPE_LABELS[q.question_type]?.icon} {q.question_type}
                  </span>
                  {q.category && (
                    <span className="q-category-pill">#{q.category}</span>
                  )}
                </div>
                {Array.isArray(q.options) && q.options.length > 0 && (
                  <div className="q-options">
                    {q.options.map((opt, i) => (
                      <span key={i} className="q-option">
                        {typeof opt === "string" ? opt : opt}
                        {q.scoring_weights?.[
                          typeof opt === "string" ? opt : opt
                        ] !== undefined && (
                          <span style={{ color: "#b0b4be", marginLeft: "3px" }}>
                            ·
                            {
                              q.scoring_weights[
                                typeof opt === "string" ? opt : opt
                              ]
                            }
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="q-actions">
                <button className="q-edit-btn" onClick={() => openEditModal(q)}>
                  ✏️ Edit
                </button>
                <button
                  className="q-delete-btn"
                  onClick={() => setDeleteTarget(q)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="assessment-modal-overlay" onClick={closeModal}>
          <div
            className="assessment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="assessment-modal-header">
              <h2>{editingId ? "Edit Question" : "Add New Question"}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="assessment-modal-body">
              {/* Question text */}
              <div className="form-group full">
                <label className="form-label">
                  Question Text <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  name="question_text"
                  rows={3}
                  placeholder="Enter the question…"
                  value={form.question_text}
                  onChange={handleField}
                  style={
                    formErrors.question_text ? { borderColor: "#dc2626" } : {}
                  }
                />
                {formErrors.question_text && (
                  <span className="form-hint" style={{ color: "#dc2626" }}>
                    {formErrors.question_text}
                  </span>
                )}
              </div>

              {/* Type + Category */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Type <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="question_type"
                    value={form.question_type}
                    onChange={handleField}
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {TYPE_LABELS[t].icon} {TYPE_LABELS[t].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    className="form-input"
                    name="category"
                    placeholder="e.g. technology, leadership…"
                    value={form.category}
                    onChange={handleField}
                  />
                </div>
              </div>

              {/* Options builder */}
              <div className="form-group full">
                <label className="form-label">
                  Answer Options &amp; Scores{" "}
                  <span className="required">*</span>
                </label>
                <p className="options-hint">
                  Each option needs a label and a score (0–10)
                </p>
                {formErrors.options && (
                  <span className="form-hint" style={{ color: "#dc2626" }}>
                    {formErrors.options}
                  </span>
                )}
                <div className="options-builder">
                  {form.options.map((opt, i) => (
                    <div key={i} className="option-row">
                      <input
                        className="form-input"
                        placeholder={`Option ${i + 1} label`}
                        value={opt.text}
                        onChange={(e) => handleOptionText(i, e.target.value)}
                      />
                      <input
                        type="number"
                        className="option-score-input"
                        min={0}
                        max={10}
                        placeholder="Score"
                        value={opt.score}
                        onChange={(e) => handleOptionScore(i, e.target.value)}
                      />
                      <button
                        className="btn-remove-option"
                        onClick={() => removeOption(i)}
                        disabled={form.options.length <= 2}
                        title="Remove option"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button className="btn-add-option" onClick={addOption}>
                    + Add Option
                  </button>
                </div>
              </div>
            </div>

            <div className="assessment-modal-footer">
              <button className="btn-modal-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn-modal-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving…"
                  : editingId
                    ? "Save Changes"
                    : "Add Question"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-icon">🗑️</div>
            <h3>Delete Question?</h3>
            <p>
              This will permanently delete this question and all associated
              answers.
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

export default AdminAssessments;
