import Desarrollos from "./paginas/desarrollos/Desarrollos";
import Login from "./paginas/login/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevo_producto/Nuevo_producto";
import Producto from "./paginas/producto/Producto";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Actualizar from "./paginas/etapa/Actualizar";
import Historial from "./paginas/etapa/Historial";
import ListadoEtapas from "./paginas/producto/Listado_etapas";
import ReasignarEtapas from "./paginas/producto/Reasignar_etapas";
import EtapasUsuario from "./paginas/etapas_usuario/EtapasUsuario";
import Iniciar from "./paginas/etapa/Iniciar";
import Modificar_etapas from "./paginas/modificar_etapas/modificar_etapas";
import Asignar_usuarios from "./paginas/modificar_etapas/Asignar_usuarios";
import Actualizar_Producto from "./paginas/producto/Actualizar_producto";
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
        path: "Producto/:id",
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
          {
            path: "Actualizar",
            element: <Actualizar_Producto />,
          },
        ],
      },
      {
        path: "ProgresoEtapa/:id",
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
      {
        path: "Modificar_Etapas",
        element: <Modificar_etapas />,
      },
      {
        path: "Modificar_Etapas/:id/asignar_usuarios",
        element: <Asignar_usuarios />,
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
