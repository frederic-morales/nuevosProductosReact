import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Desarrollos from "./paginas/desarrollos/Desarrollos";
import Login from "./paginas/login/Login";
import Layout from "./router/Layout";
import Etapa from "./paginas/etapa/Etapa";
import NuevoProducto from "./paginas/nuevo_producto/Nuevo_producto";
import Producto from "./paginas/producto/Producto";
import Actualizar from "./paginas/etapa/Actualizar";
import Historial from "./paginas/etapa/Historial";
import ListadoEtapas from "./paginas/producto/Listado_etapas";
import ReasignarEtapas from "./paginas/producto/Reasignar_etapas";
import EtapasUsuario from "./paginas/etapas_usuario/EtapasUsuario";
import Iniciar from "./paginas/etapa/Iniciar";
import Modificar_etapas from "./paginas/modificar_etapas/modificar_etapas";
import Asignar_usuarios from "./paginas/modificar_etapas/Asignar_usuarios";
import Actualizar_Producto from "./paginas/producto/Actualizar_producto";
import ProtectedRouteAdmins from "./auth/ProtectedRouteAdmins";

//REPORTES
import Reportes from "./paginas/reportes/reportes";
import Reporte_productos_usuario from "./paginas/reportes/Reporte_productos_usuario";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Producto/All",
        element: (
          <ProtectedRouteAdmins>
            <Desarrollos />
          </ProtectedRouteAdmins>
        ),
      },
      {
        path: "NuevoProducto",
        element: (
          <ProtectedRouteAdmins>
            <NuevoProducto />,
          </ProtectedRouteAdmins>
        ),
      },
      {
        path: "Producto/:productoId",
        element: <Producto />,
        children: [
          {
            path: "Etapas",
            element: (
              <ProtectedRouteAdmins>
                <ListadoEtapas />,
              </ProtectedRouteAdmins>
            ),
          },
          {
            path: "Actualizar",
            element: (
              <ProtectedRouteAdmins>
                <Actualizar_Producto />,
              </ProtectedRouteAdmins>
            ),
          },
          {
            path: "ReasignarEtapas",
            element: (
              <ProtectedRouteAdmins>
                <ReasignarEtapas />,
              </ProtectedRouteAdmins>
            ),
          },
          {
            path: "Etapas/:etapaId/:etapaAsignadaId",
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
        ],
      },
      {
        path: "Modificar_Etapas",
        element: (
          <ProtectedRouteAdmins>
            <Modificar_etapas />,
          </ProtectedRouteAdmins>
        ),
      },
      {
        path: "Modificar_Etapas/:id/asignar_usuarios",
        element: (
          <ProtectedRouteAdmins>
            <Asignar_usuarios />,
          </ProtectedRouteAdmins>
        ),
      },
      {
        path: "EtapasUsuario",
        element: <EtapasUsuario />,
      },
      {
        path: "Reportes",
        element: (
          <ProtectedRouteAdmins>
            <Reportes />,
          </ProtectedRouteAdmins>
        ),
        children: [
          {
            path: "productosUsuario/:usuario/:serie",
            element: <Reporte_productos_usuario />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
