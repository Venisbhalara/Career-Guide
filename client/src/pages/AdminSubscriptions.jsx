import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminSubscriptions.css";

const LIMIT = 15;

const PLANS = ["free", "basic", "premium", "enterprise"];
const PLAN_ICONS = { free: "🆓", basic: "⭐", premium: "💎", enterprise: "🏢" };
const PLAN_PRICES = { free: 0, basic: 499, premium: 999, enterprise: 2499 };

const STATUSES = ["active", "expired", "cancelled"];

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const fmtCurrency = (n) =>
  n === 0 ? "Free" : `₹${Number(n).toLocaleString("en-IN")}`;

const SkeletonRow = () => (
  <tr className="skeleton-row">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i}>
        <div
          className="skeleton-cell"
          style={{ width: i === 0 ? "140px" : "70px" }}
        />
      </td>
    ))}
  </tr>
);

const AdminSubscriptions = () => {
  const [subs, setSubs] = useState([]);
  const [planCounts, setPlanCounts] = useState({});
  const [revenue, setRevenue] = useState(0);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("");
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

  const fetchSubs = useCallback(
    async (page = 1, q = search, plan = planFilter, status = statusFilter) => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/subscriptions", {
          params: { page, limit: LIMIT, search: q, plan, status },
        });
        setSubs(data.subscriptions);
        setPagination(data.pagination);
        setRevenue(data.revenue);
        const counts = {};
        data.planCounts.forEach((p) => {
          counts[p.plan_type] = Number(p.count);
        });
        setPlanCounts(counts);
      } catch {
        showToast("Failed to load subscriptions", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, planFilter, statusFilter],
  );

  useEffect(() => {
    fetchSubs(1);
  }, [planFilter, statusFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => fetchSubs(1, val, planFilter, statusFilter),
      400,
    );
  };

  const handlePlanCardClick = (plan) => {
    setPlanFilter((prev) => (prev === plan ? "" : plan));
    setSearch("");
  };

  const openEdit = (sub) => {
    setEditTarget(sub);
    setEditForm({
      plan_type: sub.plan_type,
      status: sub.status,
      end_date: sub.end_date ? sub.end_date.split("T")[0] : "",
    });
  };

  const handleEditField = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/subscriptions/${editTarget.id}`, editForm);
      showToast("Subscription updated");
      setEditTarget(null);
      fetchSubs(pagination.page, search, planFilter, statusFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/admin/subscriptions/${deleteTarget.id}`);
      showToast(`Subscription for ${deleteTarget.full_name} deleted`);
      setDeleteTarget(null);
      fetchSubs(pagination.page, search, planFilter, statusFilter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to delete", "error");
    }
  };

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );
  return (
    <AdminLayout title="Subscription Management">
      {/* ── Stats ── */}
      <p className="admin-section-title">Revenue & Plan Breakdown</p>
      <div className="sub-stats">
        {/* Revenue card */}
        <div className="sub-stat-card" style={{ cursor: "default" }}>
          <div className="sub-stat-icon revenue">💰</div>
          <div>
            <div className="sub-stat-val">
              {loading ? "—" : `₹${Number(revenue).toLocaleString("en-IN")}`}
            </div>
            <div className="sub-stat-label">Active Revenue</div>
          </div>
        </div>
        {/* Plan cards */}
        {PLANS.map((plan) => (
          <div
            key={plan}
            className={`sub-stat-card ${planFilter === plan ? "active-filter" : ""}`}
            onClick={() => handlePlanCardClick(plan)}
            title={`Filter by ${plan} plan`}
          >
            <div className={`sub-stat-icon ${plan}`}>{PLAN_ICONS[plan]}</div>
            <div>
              <div className="sub-stat-val">
                {loading ? "—" : (planCounts[plan] ?? 0)}
              </div>
              <div className="sub-stat-label">{plan}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <p className="admin-section-title">All Subscriptions</p>
      <div className="sub-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search by user name or email…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <select
          className="admin-filter-select"
          value={planFilter}
          onChange={(e) => {
            setPlanFilter(e.target.value);
            setSearch("");
          }}
        >
          <option value="">All Plans</option>
          {PLANS.map((p) => (
            <option key={p} value={p}>
              {PLAN_ICONS[p]} {p}
            </option>
          ))}
        </select>
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
              {s}
            </option>
          ))}
        </select>
        {!loading && (
          <span className="sub-count-badge">
            {pagination.total} subscription{pagination.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Table ── */}
      <div className="sub-table-wrap">
        <table className="sub-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : subs.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="sub-empty">
                    <div className="sub-empty-icon">💳</div>
                    <p>
                      No subscriptions found{search ? ` for "${search}"` : ""}
                      {planFilter ? ` for plan "${planFilter}"` : ""}.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              subs.map((sub) => (
                <tr key={sub.id}>
                  {/* User */}
                  <td>
                    <div className="session-user-cell">
                      <span className="session-user-name">{sub.full_name}</span>
                      <span className="session-user-email">{sub.email}</span>
                    </div>
                  </td>
                  {/* Plan */}
                  <td>
                    <span className={`plan-badge ${sub.plan_type}`}>
                      {PLAN_ICONS[sub.plan_type]} {sub.plan_type}
                    </span>
                  </td>
                  {/* Status */}
                  <td>
                    <span className={`sub-status-badge ${sub.status}`}>
                      {sub.status}
                    </span>
                  </td>
                  {/* Amount */}
                  <td>
                    <span
                      className={`sub-amount ${sub.amount == 0 ? "free-plan" : ""}`}
                    >
                      {fmtCurrency(sub.amount)}
                    </span>
                  </td>
                  {/* Dates */}
                  <td className="sub-dates">{fmtDate(sub.start_date)}</td>
                  <td className="sub-dates">{fmtDate(sub.end_date)}</td>
                  {/* Actions */}
                  <td>
                    <div className="sub-actions">
                      <button
                        className="sub-edit-btn"
                        onClick={() => openEdit(sub)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="sub-delete-btn"
                        onClick={() => setDeleteTarget(sub)}
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
          <div className="sub-pagination">
            <span className="admin-pagination-info">
              Page {pagination.page} of {pagination.totalPages} ·{" "}
              {pagination.total} total
            </span>
            <div className="admin-pagination-btns">
              <button
                className="page-btn"
                disabled={pagination.page === 1}
                onClick={() => fetchSubs(pagination.page - 1)}
              >
                ‹
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`page-btn ${n === pagination.page ? "active" : ""}`}
                  onClick={() => fetchSubs(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => fetchSubs(pagination.page + 1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editTarget && (
        <div className="sub-modal-overlay" onClick={() => setEditTarget(null)}>
          <div className="sub-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sub-modal-header">
              <h2>Edit Subscription #{editTarget.id}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setEditTarget(null)}
              >
                ×
              </button>
            </div>
            <div className="sub-modal-body">
              {/* User info */}
              <div className="session-info-box">
                <strong>User:</strong> {editTarget.full_name}
                <br />
                <strong>Email:</strong> {editTarget.email}
                <br />
                <strong>Payment ID:</strong> {editTarget.payment_id || "—"}
              </div>

              {/* Plan */}
              <div className="form-group">
                <label className="form-label">Plan</label>
                <select
                  className="form-select"
                  name="plan_type"
                  value={editForm.plan_type}
                  onChange={handleEditField}
                >
                  {PLANS.map((p) => (
                    <option key={p} value={p}>
                      {PLAN_ICONS[p]} {p.charAt(0).toUpperCase() + p.slice(1)} —{" "}
                      {fmtCurrency(PLAN_PRICES[p])}
                    </option>
                  ))}
                </select>
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
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* End date */}
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  className="form-input"
                  type="date"
                  name="end_date"
                  value={editForm.end_date}
                  onChange={handleEditField}
                />
              </div>
            </div>
            <div className="sub-modal-footer">
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
            <h3>Delete Subscription?</h3>
            <p>
              Permanently delete <strong>{deleteTarget.full_name}</strong>
              &apos;s <strong>{deleteTarget.plan_type}</strong> subscription?
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

export default AdminSubscriptions;
