import { useState } from "react";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";
import { useOutletData } from "./OutletProductoContexts";

function ListadoEtapas() {
  // Estado que permirte mostrar las etapas rechazadas
  const { etapas, producto, etapasAnteriores } = useOutletData();
  const [mostrarRechazos, setMostrarRechazos] = useState();

  const handleClick = () => {
    setMostrarRechazos(!mostrarRechazos);
  };

  // console.log(etapas, producto);
  // console.log(etapasAnteriores);

  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-6 w-full lg:mt-12">
        <div className="w-full flex flex-col items-center rounded-2xl h-fit">
          <button
            className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit"
            onClick={handleClick}
          >
            {mostrarRechazos ? "Etapas Rechazadas" : "Etapas Totales"}
          </button>
          {!mostrarRechazos && (
            <div className="w-full flex flex-wrap justify-center gap-8 mt-8">
              {etapas?.map((etapa) => {
                if (etapa?.AsignacionEstado != 2) {
                  let ruta = "";
                  if (etapa?.AsignacionEstado == 1)
                    ruta = `${etapa.EtapaId}/${etapa?.EtapasAsignadasId}/Historial`;
                  if (etapa?.AsignacionEstado == 3 && producto?.Estado != 2)
                    ruta = `${etapa.EtapaId}/${etapa?.EtapasAsignadasId}/Actualizar`;
                  if (etapa?.AsignacionEstado == null && producto?.Estado != 2)
                    ruta = `${etapa.EtapaId}/${etapa?.EtapasAsignadasId}/Iniciar`;
                  return (
                    <EtapaDescripcion
                      key={etapa.EtapaId}
                      etapa={etapa}
                      link={ruta}
                      classCSS={`${
                        etapa?.AsignacionEstado == 1 && "bg-[#affdce]"
                      } ${etapa?.AsignacionEstado == 3 && "bg-[#879efc]"}
                                ${
                                  etapa?.AsignacionEstado == null &&
                                  "bg-[#ffa470]"
                                }`}
                    />
                  );
                }
              })}
            </div>
          )}
          {mostrarRechazos && (
            <>
              <h2 className="text-center font-black md:text-2xl mt-8 md:mt-10 mb-4 sm:mb-6 text-white uppercase drop-shadow-[1px_2px_0px_black]">
                Etapas rechazadas
              </h2>
              {etapas?.map((etapa) => {
                if (etapa?.AsignacionEstado == 2) {
                  return (
                    <EtapaDescripcion
                      key={etapa.EtapaId}
                      etapa={etapa}
                      classCSS="bg-red-400"
                      link={`${etapa.EtapaId}/${etapa?.EtapasAsignadasId}/Historial`}
                    />
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ListadoEtapas;
