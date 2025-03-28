import { createContext, useContext, useState, useEffect } from "react";
import post_verificar_usuario from "../hooks/post_verificar_usuario";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serieProductos, setSerieProductos] = useState(null);
  const [grupoUsuario, setGrupoUsuario] = useState(null);

  // Verificar si hay un usuario logeado al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSerieProductos = localStorage.getItem("serieProductos");
    const storedGrupo = localStorage.getItem("grupoUsuario");
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

    console.log(storedUser);
    console.log(storedSerieProductos);
    console.log(storedGrupo);

    setLoading(false);
  }, []);

  const login = async ({ Usuario, Password, Serie }) => {
    try {
      const result = await post_verificar_usuario({ Usuario, Password });
      const grupoUsuario = await result?.user?.CodigoGrupo;
      let role = "";
      if (grupoUsuario == 44 || grupoUsuario == 35) {
        role = "admin";
      } else {
        role = "user";
      }

      const mockUser = {
        usuario: Usuario,
        password: Password,
        role: role,
      };
      setUser(mockUser);
      setGrupoUsuario(grupoUsuario);
      setSerieProductos(Serie);

      //Guardar los elementos para acceder desde toda la aplicación
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("grupoUsuario", JSON.stringify(grupoUsuario));
      localStorage.setItem("serieProductos", JSON.stringify(Serie));

      console.log(grupoUsuario);
      console.log(result);
      console.log(mockUser);

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
  };

  const value = {
    user,
    loading,
    login,
    logout,
    serieProductos,
    grupoUsuario,
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
