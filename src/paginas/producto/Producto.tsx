import { Outlet } from "react-router";

function Producto() {
  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <div className="text-center text-gray-50 flex flex-col gap-1">
        <p className="text-xl md:text-2xl lg:text-4xl font-black uppercase drop-shadow-[1px_2px_0px_black]">
          Nombre del Producto
        </p>
        <p className="font-bold text-lg sm:text-xl lg:text-2xl drop-shadow-[2px_1px_1px_black]">
          Desarrollo Iniciado el 05 de marzo de 2025
          <br />
          Tiempo total estimado 24 meses
          <br />
          Total de rechazos: 3
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Producto;
