// ProtectedRoute.js
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRouteGeneral({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/Login" replace />;
  }
  return children;
}

export default ProtectedRouteGeneral;
