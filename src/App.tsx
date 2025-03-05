import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevoProducto/NuevoProducto";
import Producto from "./paginas/producto/Producto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Actualizar from "./paginas/etapa/Actualizar";
import Historial from "./paginas/etapa/Historial";
import ListadoEtapas from "./paginas/producto/ListadoEtapas";
import "./App.css";
import ReasignarEtapas from "./paginas/producto/ReasignarEtapas";

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
          {
            path: "Reasignar Etapas",
            element: <ReasignarEtapas />,
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
