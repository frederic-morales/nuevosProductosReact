// import { EtapaPrueba } from "../../interfaces/Etapa";
import { useState } from "react";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";

function ListadoEtapas() {
  //estados 1=Aprobada, 2=Rechazado, 3=EnProceso, 4=Pendiente
  const etapasTotales = [
    {
      id: 1,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 2,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 3,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 5,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 6,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 7,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 1,
    },
    {
      id: 8,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 3,
    },
    {
      id: 9,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 3,
    },
    {
      id: 10,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 4,
    },
    {
      id: 11,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 4,
    },
    {
      id: 12,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 4,
    },
    {
      id: 1,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 2,
    },
    {
      id: 2,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 2,
    },
    {
      id: 3,
      productoId: 3,
      nombre: "Etapa1",
      descripcion: "Descripcion sdfsdf",
      usuario: 2,
      fechaCreacion: "Ayer",
      tiempoEstimado: "31/08/2025",
      fechaInicio: "hoy",
      estado: 2,
    },
  ];

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
              {etapasTotales?.map((etapa) => {
                if (etapa.estado != 2) {
                  let ruta = "";
                  if (etapa.estado == 1) ruta = "/Etapa/Historial";
                  if (etapa.estado == 3) ruta = "/Etapa/Actualizar";
                  return (
                    <EtapaDescripcion
                      key={etapa.id}
                      etapa={etapa}
                      link={ruta}
                      classCSS={`${etapa.estado == 1 && "bg-[#affdce]"} 
                                ${etapa.estado == 3 && "bg-[#879efc]"}          
                                ${etapa.estado == 4 && "bg-gray-100"}`}
                    />
                  );
                }
              })}
            </div>
          )}
          {mostrarRechazos && (
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapasTotales?.map((etapa) => {
                if (etapa.estado == 2) {
                  return (
                    <EtapaDescripcion
                      key={etapa.id}
                      etapa={etapa}
                      classCSS="bg-red-400"
                      link="/Etapa/Historial"
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
