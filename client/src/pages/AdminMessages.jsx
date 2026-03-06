import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminMessages.css";

const LIMIT = 20;
const STATUSES = ["new", "read", "replied"];
const STATUS_ICONS = { new: "🔔", read: "👁️", replied: "✅" };
const STATUS_LABELS = { new: "New", read: "Read", replied: "Replied" };

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const SkeletonCard = () => (
  <div className="message-card-skeleton">
    <div className="sk-line" style={{ height: 12, width: "25%" }} />
    <div className="sk-line" style={{ height: 18, width: "65%" }} />
    <div className="sk-line" style={{ height: 12, width: "85%" }} />
    <div className="sk-line" style={{ height: 12, width: "70%" }} />
  </div>
);

const AdminMessages = () => {
  const [msgs, setMsgs] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const searchTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchMsgs = useCallback(
    async (page = 1, q = search, s = statusFilter) => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/messages", {
          params: { page, limit: LIMIT, search: q, status: s },
        });
        setMsgs(data.messages);
        setPagination(data.pagination);
        const counts = {};
        data.statusCounts.forEach((sc) => {
          counts[sc.status] = Number(sc.count);
        });
        setStatusCounts(counts);
      } catch {
        showToast("Failed to load messages", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter],
  );

  useEffect(() => {
    fetchMsgs(1);
  }, [statusFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => fetchMsgs(1, val, statusFilter),
      400,
    );
  };

  const handleStatClick = (s) => {
    setStatusFilter((prev) => (prev === s ? "" : s));
    setSearch("");
  };

  // ── Update status ──
  const handleStatusChange = async (msg, newStatus) => {
    try {
      await api.put(`/admin/messages/${msg.id}`, { status: newStatus });
      setMsgs((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: newStatus } : m)),
      );
      // update counts
      setStatusCounts((prev) => {
        const next = { ...prev };
        if (next[msg.status])
          next[msg.status] = Math.max(0, next[msg.status] - 1);
        next[newStatus] = (next[newStatus] || 0) + 1;
        return next;
      });
      showToast(`Marked as ${newStatus}`);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to update", "error");
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/messages/${deleteTarget.id}`);
      showToast("Message deleted");
      setDeleteTarget(null);
      fetchMsgs(pagination.page, search, statusFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to delete", "error");
    }
  };

  const total = Object.values(statusCounts).reduce((s, n) => s + n, 0);
  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );

  return (
    <AdminLayout title="Messages">
      {/* ── Status Stats ── */}
      <p className="admin-section-title">Inbox Overview</p>
      <div className="msg-stats">
        {/* Total */}
        <div
          className={`msg-stat ${statusFilter === "" ? "active-filter" : ""}`}
          onClick={() => handleStatClick("")}
        >
          <div className="mstat-dot total" />
          <div>
            <div className="mstat-val">{loading ? "—" : total}</div>
            <div className="mstat-label">Total</div>
          </div>
        </div>
        {STATUSES.map((s) => (
          <div
            key={s}
            className={`msg-stat ${statusFilter === s ? "active-filter" : ""}`}
            onClick={() => handleStatClick(s)}
            title={`Filter by ${s}`}
          >
            <div className={`mstat-dot ${s}`} />
            <div>
              <div className="mstat-val">
                {loading ? "—" : (statusCounts[s] ?? 0)}
              </div>
              <div className="mstat-label">{STATUS_LABELS[s]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <p className="admin-section-title">Messages</p>
      <div className="msg-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search by name, email, subject or message…"
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
              {STATUS_ICONS[s]} {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        {!loading && (
          <span className="msg-count-badge">
            {pagination.total} message{pagination.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Messages List ── */}
      <div className="messages-list">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : msgs.length === 0 ? (
          <div className="msg-empty">
            <div className="msg-empty-icon">📭</div>
            <p>No messages found{search ? ` for "${search}"` : ""}.</p>
          </div>
        ) : (
          msgs.map((msg) => {
            const isExpanded = expanded === msg.id;
            return (
              <div key={msg.id} className={`message-card status-${msg.status}`}>
                {/* Header */}
                <div className="msg-card-header">
                  <div className="msg-sender">
                    <span className="msg-sender-name">{msg.name}</span>
                    <span className="msg-sender-email">{msg.email}</span>
                  </div>
                  <div className="msg-card-meta">
                    <span className={`msg-status-badge ${msg.status}`}>
                      {STATUS_ICONS[msg.status]} {STATUS_LABELS[msg.status]}
                    </span>
                    <span className="msg-date">{fmtDate(msg.created_at)}</span>
                  </div>
                </div>

                {/* Subject */}
                <div className="msg-subject">{msg.subject}</div>

                {/* Body — preview or expanded */}
                {isExpanded ? (
                  <div className="msg-full-body">{msg.message}</div>
                ) : (
                  <div className="msg-preview">{msg.message}</div>
                )}

                {/* Actions row */}
                <div className="msg-card-actions">
                  {/* Expand/collapse */}
                  <button
                    className="msg-expand-btn"
                    onClick={() => setExpanded(isExpanded ? null : msg.id)}
                  >
                    {isExpanded ? "▲ Collapse" : "▼ Read full"}
                  </button>

                  {/* Reply via email client */}
                  <a
                    className="msg-reply-link"
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    onClick={() => {
                      if (msg.status === "new") handleStatusChange(msg, "read");
                    }}
                  >
                    ✉️ Reply
                  </a>

                  {/* Status transitions */}
                  {msg.status !== "new" && (
                    <button
                      className="msg-status-btn msg-btn-new"
                      onClick={() => handleStatusChange(msg, "new")}
                    >
                      🔔 Mark New
                    </button>
                  )}
                  {msg.status !== "read" && (
                    <button
                      className="msg-status-btn msg-btn-read"
                      onClick={() => handleStatusChange(msg, "read")}
                    >
                      👁️ Mark Read
                    </button>
                  )}
                  {msg.status !== "replied" && (
                    <button
                      className="msg-status-btn msg-btn-replied"
                      onClick={() => handleStatusChange(msg, "replied")}
                    >
                      ✅ Mark Replied
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    className="msg-delete-btn"
                    onClick={() => setDeleteTarget(msg)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {!loading && pagination.totalPages > 1 && (
        <div className="msg-pagination">
          <span className="admin-pagination-info">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.total} total
          </span>
          <div className="admin-pagination-btns">
            <button
              className="page-btn"
              disabled={pagination.page === 1}
              onClick={() => fetchMsgs(pagination.page - 1)}
            >
              ‹
            </button>
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`page-btn ${n === pagination.page ? "active" : ""}`}
                onClick={() => fetchMsgs(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => fetchMsgs(pagination.page + 1)}
            >
              ›
            </button>
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
            <h3>Delete Message?</h3>
            <p>
              Permanently delete the message from{" "}
              <strong>{deleteTarget.name}</strong> about &quot;
              <strong>{deleteTarget.subject}</strong>&quot;?
              <br />
              This cannot be undone.
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

export default AdminMessages;
