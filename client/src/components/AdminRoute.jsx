import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1rem",
          color: "#6b7280",
        }}
      >
        Verifying access…
      </div>
    );
  }

  if (!isAuthenticated || !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
