// ProtectedRoute.js
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmins = ({ children }) => {
  const { user } = useAuth();

  // if (grupoUsuario != 35 && grupoUsuario != 44 && grupoUsuario != 69) {
  //   return <Navigate to="/EtapasUsuario" replace />;
  // }

  if (user?.role != "admin") {
    return <Navigate to="/EtapasUsuario" replace />;
  }

  return children;
};

export default ProtectedRouteAdmins;
