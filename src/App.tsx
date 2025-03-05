import Home from "./paginas/home/Home";
import Login from "./paginas/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevoProducto/NuevoProducto";
import Producto from "./paginas/producto/Producto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Actualizar from "./paginas/etapa/Actualizar";
import Historial from "./paginas/etapa/Historial";
import ListadoEtapas from "./paginas/producto/ListadoEtapas";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "Home", element: <Home /> },
      {
        path: "NuevoProducto",
        element: <NuevoProducto />,
      },
      {
        path: "Producto",
        element: <Producto />,
        children: [
          {
            path: "Etapas",
            element: <ListadoEtapas />,
          },
        ],
      },
      {
        path: "Etapa",
        element: <Etapa />,
        children: [
          {
            path: "Actualizar",
            element: <Actualizar />,
          },
          {
            path: "Historial",
            element: <Historial />,
          },
        ],
      },
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
