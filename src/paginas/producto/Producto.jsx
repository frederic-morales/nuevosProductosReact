import { Outlet, useMatch } from "react-router";
import { useParams } from "react-router-dom";
import fetchProducto from "../../hooks/fetch_producto";
import fetch_Producto_Info from "../../hooks/fetch_producto_info";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import { OutletDataContext } from "./OutletProductoContexts";

function Producto() {
  const params = useParams();
  const productoId = params.productoId;
  const showBotonActualizar = useMatch("/Producto/:productoId/Etapas");
  const { etapas, loading, error } = fetchProducto({ productoId });
  const { info, errorInfo, loadingInfo } = fetch_Producto_Info({ productoId });
  const { user } = useAuth();

  let fechaInicio = new Date();
  if (info?.productoInfo[0].FechaInicio) {
    const fecha = new Date(info?.productoInfo[0]?.FechaInicio);
    const opciones = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timezone: "UTC",
    };
    fechaInicio = new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
  }

  let cantidadMeses = 0;
  if (info?.productoInfo[0]?.TiempoEstimado) {
    const tiempoEstimadoMes = info?.productoInfo[0]?.TiempoEstimado / 30;
    cantidadMeses = tiempoEstimadoMes.toFixed(0);
  }

  // Informacion pasada al Outlet (Componentes hijos)
  const outletValues = {
    etapas: etapas?.productoEtapas,
    producto: info?.productoInfo[0],
    etapasAnteriores: etapas?.etapasAnteriores,
  };

  if (loading || loadingInfo) {
    return <div>Cargando...</div>;
  }

  if (error || errorInfo) {
    return <div>Error: {error}</div>;
  }

  // console.log(outletValues);
  // console.log(info?.productoInfo[0]);
  // console.log(info?.productoInfo[0].FechaInicio);

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1 items-center">
        <p className="text-xl md:text-4xl lg:text-5xl font-black uppercase drop-shadow-[1px_2px_0px_black] mb-4">
          {info?.productoInfo[0]?.Nombre || ""}
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl drop-shadow-[2px_1px_1px_black]">
          Desarrollo Iniciado el
          {` ${fechaInicio}`}
          <br />
          Tiempo total estimado {cantidadMeses} meses <br />
          Total de rechazos: {info?.productoInfo[0]?.Rechazos || " 0"}
        </p>
        {showBotonActualizar && user.role == "admin" && (
          <>
            <Link
              to={"Actualizar"}
              className="w-full max-w-3xs bg-blue-600 hover:bg-blue-800 text-white mt-3 py-3 px-8 rounded-2xl focus:outline-none focus:shadow-outline font-bold sm:text-lg lg:text-"
            >
              Actualizar
            </Link>
            <Link
              to={"ReasignarEtapas"}
              className="w-full max-w-3xs bg-blue-600 hover:bg-blue-800 text-white mt-3 py-3 px-8 rounded-2xl focus:outline-none focus:shadow-outline font-bold sm:text-lg lg:text-"
            >
              Reasignar Etapas
            </Link>
          </>
        )}
      </div>
      {/* <Outlet context={etapas?.productoEtapas} /> */}
      <OutletDataContext.Provider value={outletValues}>
        <Outlet />
      </OutletDataContext.Provider>
    </div>
  );
}

export default Producto;
