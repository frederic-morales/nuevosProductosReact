import { NavLink } from "react-router-dom";
import { Etapa } from "../../interfaces/Etapa";
import { useState } from "react";

function ListadoEtapas() {
  //estados 1=Aprobada, 2=Rechazado, 3=EnProceso, 4=Pendiente
  const etapasTotales: Etapa[] = [
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
  ];

  const etapasRechazadas: Etapa[] = [
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
  const [mostrarRechazos, setMostrarRechazos] = useState<boolean>(false);

  const handleClick = () => {
    setMostrarRechazos(!mostrarRechazos);
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-6 w-full lg:mt-12">
        <div className="w-full flex flex-col items-center rounded-2xl h-fit">
          <button
            // className={`text-lg font-bold border-b py-2 text-center text-white md:text-2xl hover:cursor-pointer drop-shadow-[2px_1px_0px_black]`}
            className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit"
            onClick={handleClick}
          >
            {mostrarRechazos ? "Etapas Rechazadas" : "Etapas Totales"}
          </button>
          {!mostrarRechazos && (
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapasTotales?.map((etapa) => (
                <NavLink
                  to={`${etapa.estado == 1 ? "/Etapa/Historial" : ""}${
                    etapa.estado == 3 ? "/Etapa/Actualizar" : ""
                  }`}
                  key={etapa.id}
                >
                  <div
                    key={etapa.id}
                    className={`w-full min-w-[200px] max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95
                  ${etapa.estado == 1 && "bg-[#affdce]"} 
                  ${etapa.estado == 3 && "bg-[#879efc]"} 
                  ${etapa.estado == 4 && "bg-[#f3f3f3]"}`}
                  >
                    <p className="text-xs md:text-sm text-black font-semibold">
                      <b>Etapa {etapa.nombre}</b>
                      {etapa.estado == 1 && (
                        <>
                          <br /> Etapa Aprobada
                          <br /> Usuario Responsable
                        </>
                      )}
                      {etapa.estado == 4 && (
                        <>
                          <br /> Etapa Pendiente
                        </>
                      )}
                      {etapa.estado == 3 && (
                        <>
                          <br /> Etapa en proceso
                          <br /> Usuario Responsable
                        </>
                      )}
                      <br /> Proceso Responsable
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
          {mostrarRechazos && (
            <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
              {etapasRechazadas?.map((etapa) => (
                <NavLink to={`/Etapa/Historial`} key={etapa.id}>
                  <div
                    key={etapa.id}
                    className={`w-full min-w-[200px] max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95 bg-red-400`}
                  >
                    <p className="text-xs md:text-sm text-black font-semibold">
                      <b>Etapa {etapa.nombre}</b>
                      <br /> Proceso Responsable
                      <p>Usuario Responsable</p>
                      <p>Etapa rechazada el 06 de marzo del 2025</p>
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListadoEtapas;
