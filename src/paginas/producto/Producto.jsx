import { Outlet, useMatch } from "react-router";
import { useParams } from "react-router-dom";
import fetchProducto from "../../hooks/fetch_producto";
import { Link } from "react-router";

function Producto() {
  const params = useParams();
  const productoId = params.productoId;
  const { info, etapas, loading, error } = fetchProducto({ productoId });

  const showBotonActualizar = useMatch("/Producto/:productoId/Etapas");

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(showBotonActualizar);
  console.log(location.pathname);

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1 items-center">
        <p className="text-xl md:text-2xl lg:text-4xl font-black uppercase drop-shadow-[1px_2px_0px_black]">
          {info.productoInfo[0].Nombre || ""}
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl drop-shadow-[2px_1px_1px_black]">
          Desarrollo Iniciado el
          {info.productoInfo[0].FechaInicio}
          <br />
          Tiempo total estimado 24 meses
          <br />
          Total de rechazos:
          {info.productoInfo[0].Rechazos || "0"}
        </p>
        {showBotonActualizar && (
          <Link
            to={"Actualizar"}
            className="w-full max-w-3xs bg-blue-600 hover:bg-blue-800 text-white mt-3 py-3 px-8 rounded-2xl focus:outline-none focus:shadow-outline font-bold sm:text-lg lg:text-"
          >
            Actualizar
          </Link>
        )}
      </div>
      <Outlet context={etapas.productoEtapas} />
    </div>
  );
}

export default Producto;
