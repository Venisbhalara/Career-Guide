import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminCounselling.css";

const LIMIT = 15;
const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_ICONS = {
  pending: "⏳",
  confirmed: "✅",
  completed: "🎓",
  cancelled: "❌",
};

const COUNSELLORS = [
  "Dr. Priya Sharma",
  "Mr. Rajesh Kumar",
  "Ms. Ananya Desai",
  "Dr. Vikram Patel",
  "To be assigned",
];

// ─── Skeleton row ────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="skeleton-row">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i}>
        <div
          className="skeleton-cell"
          style={{ width: i === 0 ? "130px" : i === 6 ? "90px" : "80px" }}
        />
      </td>
    ))}
  </tr>
);

// ─── Date formatter ──────────────────────────────────────
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ─── Main Component ──────────────────────────────────────
const AdminCounselling = () => {
  const [sessions, setSessions] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const searchTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch ──
  const fetchSessions = useCallback(
    async (page = 1, q = search, s = statusFilter) => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/counselling", {
          params: { page, limit: LIMIT, search: q, status: s },
        });
        setSessions(data.sessions);
        setPagination(data.pagination);
        const counts = {};
        data.statusCounts.forEach((sc) => {
          counts[sc.status] = Number(sc.count);
        });
        setStatusCounts(counts);
      } catch {
        showToast("Failed to load sessions", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter],
  );

  useEffect(() => {
    fetchSessions(1);
  }, [statusFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => fetchSessions(1, val, statusFilter),
      400,
    );
  };

  // ── Status card click → toggle filter ──
  const handleStatClick = (s) => {
    setStatusFilter((prev) => (prev === s ? "" : s));
    setSearch("");
  };

  // ── Quick inline status change ──
  const handleQuickStatus = async (session, newStatus) => {
    try {
      await api.put(`/admin/counselling/${session.id}`, { status: newStatus });
      setSessions((prev) =>
        prev.map((s) =>
          s.id === session.id ? { ...s, status: newStatus } : s,
        ),
      );
      showToast(`Status updated to ${newStatus}`);
      // Refresh counts
      fetchSessions(pagination.page, search, statusFilter);
    } catch (err) {
      showToast(
        err.response?.data?.error || "Failed to update status",
        "error",
      );
    }
  };

  // ── Edit modal ──
  const openEditModal = (session) => {
    setEditTarget(session);
    setEditForm({
      status: session.status,
      counsellor_name: session.counsellor_name || "",
      meeting_link: session.meeting_link || "",
      notes: session.notes || "",
    });
  };

  const handleEditField = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/counselling/${editTarget.id}`, editForm);
      showToast("Session updated");
      setEditTarget(null);
      fetchSessions(pagination.page, search, statusFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/counselling/${deleteTarget.id}`);
      showToast("Session deleted");
      setDeleteTarget(null);
      fetchSessions(pagination.page, search, statusFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to delete", "error");
    }
  };

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );

  return (
    <AdminLayout title="Counselling Management">
      {/* ── Status Stats ── */}
      <p className="admin-section-title">Session Overview</p>
      <div className="counselling-stats">
        {STATUSES.map((s) => (
          <div
            key={s}
            className={`counselling-stat ${statusFilter === s ? "active-filter" : ""}`}
            onClick={() => handleStatClick(s)}
            title={`Filter by ${s}`}
          >
            <div className={`cstat-dot ${s}`} />
            <div>
              <div className="cstat-val">
                {loading ? "—" : (statusCounts[s] ?? 0)}
              </div>
              <div className="cstat-label">{s}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <p className="admin-section-title">All Sessions</p>
      <div className="counselling-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search by user, email or counsellor…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setSearch("");
          }}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_ICONS[s]} {s}
            </option>
          ))}
        </select>

        {!loading && (
          <span className="session-count-badge">
            {pagination.total} session{pagination.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Table ── */}
      <div className="counselling-table-wrap">
        <table className="counselling-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Date &amp; Time</th>
              <th>Counsellor</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Meeting Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="counselling-empty">
                    <div className="counselling-empty-icon">🧑‍💼</div>
                    <p>
                      No sessions found{search ? ` for "${search}"` : ""}
                      {statusFilter ? ` with status "${statusFilter}"` : ""}.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id}>
                  {/* User */}
                  <td>
                    <div className="session-user-cell">
                      <span className="session-user-name">
                        {session.full_name}
                      </span>
                      <span className="session-user-email">
                        {session.email}
                      </span>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td>
                    <div className="session-datetime">
                      <span className="session-date">
                        {fmtDate(session.session_date)}
                      </span>
                      <span className="session-time">
                        {session.session_time?.slice(0, 5)}
                      </span>
                    </div>
                  </td>

                  {/* Counsellor */}
                  <td style={{ fontSize: "0.82rem", color: "#4a4a6a" }}>
                    {session.counsellor_name || "—"}
                  </td>

                  {/* Duration */}
                  <td style={{ color: "#8b90a0", fontSize: "0.8rem" }}>
                    {session.duration ? `${session.duration} min` : "60 min"}
                  </td>

                  {/* Status — quick dropdown */}
                  <td>
                    <select
                      className="status-select-inline"
                      value={session.status}
                      onChange={(e) =>
                        handleQuickStatus(session, e.target.value)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_ICONS[s]} {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Meeting link */}
                  <td>
                    {session.meeting_link ? (
                      <a
                        href={session.meeting_link}
                        target="_blank"
                        rel="noreferrer"
                        className="meeting-link-chip"
                        title={session.meeting_link}
                      >
                        🔗 Join
                      </a>
                    ) : (
                      <span className="meeting-none">Not set</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="session-actions">
                      <button
                        className="session-edit-btn"
                        onClick={() => openEditModal(session)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="session-delete-btn"
                        onClick={() => setDeleteTarget(session)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="counselling-pagination">
            <span className="admin-pagination-info">
              Page {pagination.page} of {pagination.totalPages} ·{" "}
              {pagination.total} total
            </span>
            <div className="admin-pagination-btns">
              <button
                className="page-btn"
                disabled={pagination.page === 1}
                onClick={() => fetchSessions(pagination.page - 1)}
              >
                ‹
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`page-btn ${n === pagination.page ? "active" : ""}`}
                  onClick={() => fetchSessions(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => fetchSessions(pagination.page + 1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit Session Modal ── */}
      {editTarget && (
        <div
          className="session-modal-overlay"
          onClick={() => setEditTarget(null)}
        >
          <div className="session-modal" onClick={(e) => e.stopPropagation()}>
            <div className="session-modal-header">
              <h2>Edit Session #{editTarget.id}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setEditTarget(null)}
              >
                ×
              </button>
            </div>

            <div className="session-modal-body">
              {/* Session info */}
              <div className="session-info-box">
                <strong>User:</strong> {editTarget.full_name} (
                {editTarget.email})<br />
                <strong>Date:</strong> {fmtDate(editTarget.session_date)} at{" "}
                {editTarget.session_time?.slice(0, 5)}
                <br />
                <strong>Duration:</strong> {editTarget.duration || 60} min
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={editForm.status}
                  onChange={handleEditField}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_ICONS[s]} {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Counsellor */}
              <div className="form-group">
                <label className="form-label">Assigned Counsellor</label>
                <select
                  className="form-select"
                  name="counsellor_name"
                  value={editForm.counsellor_name}
                  onChange={handleEditField}
                >
                  {COUNSELLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meeting link */}
              <div className="form-group">
                <label className="form-label">Meeting Link</label>
                <input
                  className="form-input"
                  name="meeting_link"
                  placeholder="https://meet.google.com/xxx or Zoom link"
                  value={editForm.meeting_link}
                  onChange={handleEditField}
                />
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">Admin Notes</label>
                <textarea
                  className="form-textarea"
                  name="notes"
                  rows={2}
                  placeholder="Internal notes about this session…"
                  value={editForm.notes}
                  onChange={handleEditField}
                />
              </div>
            </div>

            <div className="session-modal-footer">
              <button
                className="btn-modal-cancel"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn-modal-save"
                onClick={handleSaveEdit}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Changes"}
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
            <h3>Delete Session?</h3>
            <p>
              Permanently delete the session for{" "}
              <strong>{deleteTarget.full_name}</strong> on{" "}
              <strong>{fmtDate(deleteTarget.session_date)}</strong>?
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

export default AdminCounselling;
