import Desarrollos from "./paginas/desarrollos/Desarrollos";
import Login from "./paginas/login/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevoProducto/NuevoProducto";
import Producto from "./paginas/producto/Producto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Actualizar from "./paginas/etapa/Actualizar";
import Historial from "./paginas/etapa/Historial";
import ListadoEtapas from "./paginas/producto/ListadoEtapas";
import ReasignarEtapas from "./paginas/producto/ReasignarEtapas";
import EtapasUsuario from "./paginas/etapasUsuario/EtapasUsuario";
import Iniciar from "./paginas/etapa/Iniciar";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Desarrollos /> },
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
          {
            path: "Iniciar",
            element: <Iniciar />,
          },
        ],
      },
      {
        path: "EtapasUsuario",
        element: <EtapasUsuario />,
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
