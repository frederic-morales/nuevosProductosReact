import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";

function ListadoEtapas() {
  // Estado que permirte mostrar las etapas rechazadas
  const etapas = useOutletContext();
  const [mostrarRechazos, setMostrarRechazos] = useState();

  const handleClick = () => {
    setMostrarRechazos(!mostrarRechazos);
  };

  // console.log(etapas);
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
                if (etapa.ProgresoEstado != 2) {
                  let ruta = "";
                  if (etapa?.ProgresoEstado == 1)
                    ruta = `${etapa.EtapaId}/Historial`;
                  if (etapa?.ProgresoEstado == 3)
                    ruta = `${etapa.EtapaId}/Actualizar`;
                  if (etapa?.ProgresoEstado == null)
                    ruta = `${etapa.EtapaId}/Iniciar`;

                  return (
                    <EtapaDescripcion
                      key={etapa.EtapaId}
                      etapa={etapa}
                      link={ruta}
                      classCSS={`${etapa.ProgresoEstado == 1 && "bg-[#affdce]"} 
                                ${etapa.ProgresoEstado == 3 && "bg-[#879efc]"}
                                ${etapa.ProgresoEstado == null && "bg-white"}`}
                    />
                  );
                }
              })}
            </div>
          )}
          {mostrarRechazos && (
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapas?.map((etapa) => {
                if (etapa.ProgresoEstado == 2) {
                  return (
                    <EtapaDescripcion
                      key={etapa.id}
                      etapa={etapa}
                      classCSS="bg-red-400"
                      link={`${etapa.EtapaId}/Historial`}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListadoEtapas;
