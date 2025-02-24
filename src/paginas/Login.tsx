import { useState } from "react";
import { NavLink } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();
    // try {
    //   const response = await fetch("http://localhost:4000/api/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     alert(data.message);
    //   } else {
    //     alert("Inicio de sesión exitoso");
    //     localStorage.setItem("token", data.token);
    //     window.location.href = "/dashboard";
    //   }
    // } catch (error) {
    //   console.log(error);
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1579165466991-467135ad3110?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFib3JhdG9yaW98ZW58MHx8MHx8fDA%3D")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white opacity-90 p-8 rounded-lg shadow-2xl shadow-blue-200 w-4/5 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <NavLink to={"/home"}>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Iniciar Sesión
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
