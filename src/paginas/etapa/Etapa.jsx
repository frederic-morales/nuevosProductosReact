import { Outlet, Link } from "react-router";
import { useParams } from "react-router";
import fetch_etapa_progreso from "../../hooks/fetch_etapa_progreso";

function Etapa() {
  const params = useParams();
  const desarrolloProductoId = params.productoId;
  const etapaId = params.etapaId;
  const { etapaProgreso, errorProgreso, loadingProgreso } =
    fetch_etapa_progreso({ desarrolloProductoId, etapaId });

  if (loadingProgreso || !etapaProgreso) {
    <div>Cargando...</div>;
  }

  if (errorProgreso || !etapaProgreso) {
    <div>Error...</div>;
  }

  console.log(errorProgreso, loadingProgreso);
  console.log(etapaProgreso);
  // console.log(etapaProgreso.infoEtapa[0]);

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
          <button className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
            Actualizar Etapa
          </button>
        </Link>
        <Link to={"Historial"}>
          <button className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
            Historial de la Etapa
          </button>
        </Link>
        <Link to={"Iniciar"}>
          <button className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
            Iniciar Etapa
          </button>
        </Link>
      </div>
      <Outlet context={etapaProgreso} />
    </div>
  );
}

export default Etapa;
