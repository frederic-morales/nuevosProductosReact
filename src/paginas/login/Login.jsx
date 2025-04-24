import { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import CheckSerie from "../../componentes/CheckSerie";
import { useAuth } from "../../auth/AuthContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [serie, setSerie] = useState(""); // Serie del producto
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // console.log(usuario, password);
    const result = await login({
      Usuario: usuario,
      Password: password,
      Serie: serie,
    });

    // console.log(result);

    console.log(result?.verificacion);
    if (result?.verificacion) {
      navigate("/Producto/All");
    } else {
      logout();
      setError(result.message || "Credenciales incorrectas!!!");
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(40, 40, 40, 0.5), rgba(60, 60, 60, 0.5)),  url("https://images.unsplash.com/photo-1579165466991-467135ad3110?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFib3JhdG9yaW98ZW58MHx8MHx8fDA%3D")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {error && (
        <p className="text-red-500 text-xl md:text-2xl font-bold m-3 drop-shadow-[3px_5px_5px_black] uppercase">
          {error}
        </p>
      )}
      <div className="bg-white opacity-95 p-8 rounded-lg shadow-lg shadow-blue-300 w-4/5 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 uppercase">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Usuario
            </label>
            <input
              id="email"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <CheckSerie
            onChange={setSerie}
            hasError={!serie}
            classCss={"drop-shadow-[1px_1px_1px_white] text-black opacity-85"}
          />
          {usuario && password && serie && (
            <NavLink to={"/"}>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 mt-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Iniciar Sesión
              </button>
            </NavLink>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
