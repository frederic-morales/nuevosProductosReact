import { Outlet, useMatch, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import fetchProducto from "../../hooks/fetch_producto";
import fetch_Producto_Info from "../../hooks/fetch_producto_info";
import { Link } from "react-router";
import { useAuth } from "../../auth/AuthContext";

function Producto() {
  const params = useParams();
  const productoId = params.productoId;
  const { etapas, loading, error } = fetchProducto({ productoId });
  const { info, errorInfo, loadingInfo } = fetch_Producto_Info({ productoId });
  const showBotonActualizar = useMatch("/Producto/:productoId/Etapas");

  // useEffect(() => {
  //   if (useMatch("/Producto/:productoId")) {
  //     useNavigate("/Producto/:productoId/Etapas");
  //   }
  // });

  const { user } = useAuth();

  if (loading || loadingInfo) {
    return <div>Cargando...</div>;
  }

  if (error || errorInfo) {
    return <div>Error: {error}</div>;
  }

  console.log(showBotonActualizar);
  console.log(location.pathname);
  // console.log(etapas);

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1 items-center">
        <p className="text-xl md:text-4xl lg:text-5xl font-black uppercase drop-shadow-[1px_2px_0px_black] mb-4">
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
        {showBotonActualizar && user.role == "admin" && (
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
