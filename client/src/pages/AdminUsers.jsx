import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../utils/api";
import "../styles/pages/AdminUsers.css";

const LIMIT = 15;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // userId being acted on
  const [deleteTarget, setDeleteTarget] = useState(null); // user to confirm delete
  const [toast, setToast] = useState(null);
  const searchTimer = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = useCallback(
    async (page = 1, q = search, r = role) => {
      setLoading(true);
      try {
        const { data } = await api.get("/admin/users", {
          params: { page, limit: LIMIT, search: q, role: r },
        });
        setUsers(data.users);
        setPagination(data.pagination);
      } catch {
        showToast("Failed to load users", "error");
      } finally {
        setLoading(false);
      }
    },
    [search, role],
  );

  useEffect(() => {
    fetchUsers(1);
  }, [role]); // refetch when role filter changes

  // Debounced search
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchUsers(1, val, role), 400);
  };

  const handlePageChange = (p) => fetchUsers(p, search, role);

  // ── Toggle admin role ──
  const handleToggleAdmin = async (user) => {
    setActionLoading(user.id);
    try {
      const { data } = await api.put(`/admin/users/${user.id}/toggle-admin`);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_admin: data.is_admin } : u,
        ),
      );
      showToast(data.message);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to update role", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Delete user ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setActionLoading(deleteTarget.id);
    try {
      await api.delete(`/admin/users/${deleteTarget.id}`);
      showToast(`${deleteTarget.full_name} deleted`);
      setDeleteTarget(null);
      fetchUsers(pagination.page, search, role);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to delete user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );

  const startRow = (pagination.page - 1) * LIMIT + 1;
  const endRow = Math.min(pagination.page * LIMIT, pagination.total);

  return (
    <AdminLayout title="User Management">
      {/* Toolbar */}
      <p className="admin-section-title">All Users</p>

      <div className="admin-users-toolbar">
        <div className="admin-search-wrap">
          <span className="admin-search-icon">🔍</span>
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <select
          className="admin-filter-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins Only</option>
          <option value="user">Users Only</option>
        </select>

        {!loading && (
          <span className="admin-users-count">
            {pagination.total} user{pagination.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="skeleton-row">
                  {Array.from({ length: 4 }).map((__, j) => (
                    <td key={j}>
                      <div
                        className="skeleton-cell"
                        style={{
                          width: j === 0 ? "120px" : j === 3 ? "80px" : "70px",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="admin-empty">
                    <div className="admin-empty-icon">👥</div>
                    <p>No users found{search ? ` for "${search}"` : ""}.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  {/* User name + email */}
                  <td>
                    <div className="user-cell">
                      <div className="user-cell-avatar">
                        {u.full_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <div className="user-cell-name">{u.full_name}</div>
                        <div className="user-cell-email">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <span
                      className={`role-badge ${u.is_admin ? "admin" : "user"}`}
                    >
                      {u.is_admin ? "⚙️ Admin" : "👤 User"}
                    </span>
                  </td>

                  {/* Joined */}
                  <td style={{ color: "#8b90a0", fontSize: "0.8rem" }}>
                    {formatDate(u.created_at)}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="admin-table-actions">
                      <button
                        className={`action-btn ${u.is_admin ? "demote" : "promote"}`}
                        disabled={actionLoading === u.id}
                        onClick={() => handleToggleAdmin(u)}
                        title={u.is_admin ? "Revoke Admin" : "Make Admin"}
                      >
                        {u.is_admin ? "↓ Demote" : "↑ Promote"}
                      </button>
                      <button
                        className="action-btn delete"
                        disabled={actionLoading === u.id}
                        onClick={() => setDeleteTarget(u)}
                        title="Delete user"
                      >
                        🗑
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
          <div className="admin-pagination">
            <span className="admin-pagination-info">
              {startRow}–{endRow} of {pagination.total}
            </span>
            <div className="admin-pagination-btns">
              <button
                className="page-btn"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                ‹
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  className={`page-btn ${n === pagination.page ? "active" : ""}`}
                  onClick={() => handlePageChange(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="page-btn"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-icon">🗑️</div>
            <h3>Delete User?</h3>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>{deleteTarget.full_name}</strong>?
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
                disabled={actionLoading === deleteTarget?.id}
              >
                {actionLoading === deleteTarget?.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
