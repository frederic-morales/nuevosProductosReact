import { createContext, useContext, useState, useEffect } from "react";
import post_verificar_usuario from "../hooks/post_verificar_usuario";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // en segundos
    console.log(decoded.exp, currentTime);
    return decoded.exp < currentTime;
  } catch (err) {
    console.log("Token inválido o roto:", err);
    return true; // si no se puede decodificar, está roto o inválido
  }
};

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serieProductos, setSerieProductos] = useState(null);
  const [grupoUsuario, setGrupoUsuario] = useState(null);
  const [token, setToken] = useState(null); // Token de autenticación temporal

  // Verificar si hay un usuario logeado al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSerieProductos = localStorage.getItem("serieProductos");
    const storedGrupo = localStorage.getItem("grupoUsuario");
    const storedToken = localStorage.getItem("token");
    // const storedGrupoUsuario = localStorage.getItem("grupoUsuario");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedSerieProductos) {
      setSerieProductos(JSON.parse(storedSerieProductos));
    }
    if (storedGrupo) {
      setGrupoUsuario(JSON.parse(storedGrupo));
    }
    if (storedToken && storedToken !== "undifined") {
      if (isTokenExpired(storedToken)) {
        logout();
      } else {
        setToken(storedToken); // GUARDAR TOKEN
      }
    }

    // console.log(storedUser);
    // console.log(storedSerieProductos);
    // console.log(storedGrupo);
    // console.log(storedToken); // Verificar el token recuperado
    setLoading(false);
  }, []);

  //VERIFICAR SI EL TOKEN HA EXPIRADO CADA 60 SEGUNDOS
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Verificando token...");
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        console.log("🔒 Token expirado, cerrando sesión...");
        logout();
        alert("Sesion expirada, inicie sesión nuevamente.");
        window.location.href = "/Login"; // REDIRIGIR AL LOGIN SI EL TOKEN EXPIRÓ
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //LOGIN
  const login = async ({ Usuario, Password, Serie }) => {
    try {
      const result = await post_verificar_usuario({ Usuario, Password });
      const grupoUsuario = await result?.user?.CodigoGrupo;
      const token = await result?.token; // Obtener el token de la respuesta

      let role = "";
      if (grupoUsuario == 44 || grupoUsuario == 35) {
        role = "admin";
      } else {
        role = "user";
      }

      const currentUser = {
        usuario: Usuario,
        password: Password,
        role: role,
      };

      setUser(currentUser);
      setGrupoUsuario(grupoUsuario);
      setSerieProductos(Serie);
      setToken(token); // Guardar el token en el estado y en el localStorage

      //Guardar los elementos para acceder desde toda la aplicación con localStorage
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("grupoUsuario", JSON.stringify(grupoUsuario));
      localStorage.setItem("serieProductos", JSON.stringify(Serie));
      localStorage.setItem("token", token);

      // console.log(grupoUsuario);
      // console.log(result);
      // console.log(currentUser);
      // console.log(Serie);
      // console.log(token); // Verificar el token guardado

      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");

    setGrupoUsuario(null);
    localStorage.removeItem("grupoUsuario");

    setSerieProductos(null);
    localStorage.removeItem("serieProductos");

    setSerieProductos(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    serieProductos,
    grupoUsuario,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
