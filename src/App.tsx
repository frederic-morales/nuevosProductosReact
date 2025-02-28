import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevoProducto/NuevoProducto";
import Producto from "./paginas/producto/Producto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/Home", element: <Home /> },
      {
        path: "NuevoProducto",
        element: <NuevoProducto />,
      },
      {
        path: "Producto",
        element: <Producto />,
      },
      { path: "Etapa", element: <Etapa /> },
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
