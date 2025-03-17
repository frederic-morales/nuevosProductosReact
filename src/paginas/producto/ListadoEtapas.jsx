import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";

function ListadoEtapas() {
  //"Estados:" 1 = aprobado, 2 = rechazado, 3 = iniciado

  const etapas = useOutletContext();
  console.log(etapas);

  // Estado que permirte mostrar las etapas rechazadas
  const [mostrarRechazos, setMostrarRechazos] = useState();

  const handleClick = () => {
    setMostrarRechazos(!mostrarRechazos);
  };

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
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapas?.map((etapa) => {
                if (etapa.Estado != 2) {
                  let ruta = "";
                  if (etapa.Estado == 1) ruta = "/Etapas/1/Historial";
                  if (etapa.Estado == 3) ruta = "/Etapas/1/Actualizar";
                  if (etapa.Estado == null) ruta = "/Etapa/1/Actualizar";
                  return (
                    <EtapaDescripcion
                      key={etapa.EtapaId}
                      etapa={etapa}
                      link={ruta}
                      classCSS={`${etapa.Estado == 1 && "bg-[#affdce]"} 
                                ${etapa.Estado == 3 && "bg-[#879efc]"}          
                                ${etapa.Estado == null && "bg-gray-100"}`}
                    />
                  );
                }
              })}
            </div>
          )}
          {mostrarRechazos && (
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapas?.map((etapa) => {
                if (etapa.Estado == 2) {
                  return (
                    <EtapaDescripcion
                      key={etapa.id}
                      etapa={etapa}
                      classCSS="bg-red-400"
                      link="/Etapas/1/Historial"
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
