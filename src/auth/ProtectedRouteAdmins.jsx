// ProtectedRoute.js
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmins = ({ children }) => {
  const { grupoUsuario } = useAuth();
  //   console.log(user);
  //   console.log(user.role);
  //   console.log(grupoUsuario);

  if (grupoUsuario != 35 && grupoUsuario != 44 && grupoUsuario != 69) {
    return <Navigate to="/EtapasUsuario" replace />;
  }

  return children;
};

export default ProtectedRouteAdmins;
