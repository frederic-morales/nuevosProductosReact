import { Outlet } from "react-router";

function Producto() {
  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1">
        <p className="text-xl md:text-2xl lg:text-4xl font-black uppercase">
          Nombre del Producto
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl">
          Desarrollo Iniciado el 05 de marzo de 2025
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl">
          Tiempo estimado 24 meses
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Producto;
