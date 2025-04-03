import { Outlet, Link } from "react-router";
import { useParams } from "react-router";
import fetch_etapa_progreso from "../../hooks/fetch_etapa_progreso";
import fetch_etapa_historial from "../../hooks/fetch_etapa_historial";
import AccessDenied from "../../componentes/AccessDenied";
// import { useEffect, useState } from "react";

function Etapa() {
  const params = useParams();
  const desarrolloProductoId = params.productoId;
  const etapaId = params.etapaId;

  const { etapaHistorial, loadingHistorial, errorHistorial } =
    fetch_etapa_historial({ desarrolloProductoId, etapaId });

  const { etapaProgreso, errorProgreso, loadingProgreso } =
    fetch_etapa_progreso({ desarrolloProductoId, etapaId });

  if (
    loadingProgreso ||
    loadingHistorial ||
    !etapaHistorial ||
    !etapaProgreso
  ) {
    <div>Cargando...</div>;
  }

  if (errorProgreso || errorHistorial || !etapaHistorial || !etapaProgreso) {
    <div>Error...</div>;
  }

  console.log(etapaProgreso?.infoEtapa);

  if (!etapaProgreso?.infoEtapa.PermitirInicio) {
    return (
      <>
        <AccessDenied
          title={etapaProgreso?.infoEtapa.NombreEtapa}
          message="Etapa Bloqueda!! No es posible Iniciar esta etapa"
        ></AccessDenied>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center mt-12 mb-16">
      {/* Titutlo del producto y de la etapa correspondiente */}
      <div className="w-[100%] flex flex-col">
        <h2 className="text-xl text-center font-black md:text-3xl mb-4 sm:mb-6 text-white uppercase drop-shadow-[1px_2px_0px_black]">
          {etapaProgreso?.NombreEtapa}
        </h2>
        <h4 className="text-lg font-black text-center text-white md:text-xl mb-6 sm:mb-8 drop-shadow-[1px_1px_0px_black] uppercase">
          {etapaProgreso?.infoEtapa?.[0]?.ActualizacionEstado === 3
            ? "Etapa en proceso"
            : ""}
        </h4>
        <div className="flex">
          {etapaProgreso &&
            etapaProgreso?.infoEtapa?.AsignacionEstado === 3 && (
              <Link to={"Actualizar"}>
                <button className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
                  Actualizar Etapa
                </button>
              </Link>
            )}
          {(etapaProgreso?.infoEtapa?.AsignacionEstado === 1 ||
            etapaProgreso?.infoEtapa?.AsignacionEstado === 2 ||
            etapaProgreso?.infoEtapa?.AsignacionEstado === 3) &&
            etapaHistorial?.response?.length > 0 && (
              <Link to="Historial">
                <button className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
                  Historial de la Etapa
                </button>
              </Link>
            )}
        </div>
      </div>
      <Outlet context={etapaProgreso?.infoEtapa} />
    </div>
  );
}

export default Etapa;
