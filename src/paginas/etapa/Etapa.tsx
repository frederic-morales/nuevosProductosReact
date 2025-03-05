import { Outlet, Link } from "react-router";
// import Actualizar from "./Actualizar";
// import Historial from "./Historial";

function Etapa() {
  return (
    <div className="flex flex-col items-center mt-12 mb-16">
      {/* Titutlo del producto y de la etapa correspondiente */}
      <div className="w-[100%] sm:w-9/12">
        <h2 className="text-2xl text-center font-black md:text-4xl mb-4 sm:mb-6 text-white uppercase drop-shadow-[1px_2px_0px_black]">
          Etapa 1 Producto 1
        </h2>
        <h4 className="text-lg font-black text-center text-white md:text-xl mb-6 sm:mb-8 drop-shadow-[1px_1px_0px_black] uppercase">
          Etapa en Proceso
        </h4>
        <Link to={"Actualizar"}>
          <button className="text-start mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
            Actualizar Etapa
          </button>
        </Link>
        <Link to={"Historial"}>
          <button className="text-start cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
            Historial de la Etapa
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Etapa;
