import { Outlet } from "react-router";
import { useParams } from "react-router-dom";
import fetchProducto from "../../hooks/fetchProducto";

function Producto() {
  const params = useParams();
  const productoId = params.id;
  // const productoId = params.productoId;
  const { info, etapas, loading, error } = fetchProducto({ productoId });

  console.log(productoId);
  console.log(info);
  console.log(etapas);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1">
        <p className="text-xl md:text-2xl lg:text-4xl font-black uppercase drop-shadow-[1px_2px_0px_black]">
          {info.productoInfo[0].Nombre}
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl drop-shadow-[2px_1px_1px_black]">
          Desarrollo Iniciado el {info.productoInfo[0].FechaInicio}
          <br />
          Tiempo total estimado 24 meses
          <br />
          Total de rechazos: {info.productoInfo[0].Rechazos || "0"}
        </p>
      </div>
      <Outlet context={etapas.productoEtapas} />
    </div>
  );
}

export default Producto;
