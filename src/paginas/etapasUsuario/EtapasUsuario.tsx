import { useState } from "react";
import { Etapa } from "../../interfaces/Etapa";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";
import Button from "../../componentes/Button";

function EtapasUsuario() {
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
      id: 10,
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
      id: 100,
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
      id: 11,
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
      id: 13,
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
      id: 15,
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

  const [listarEtapas, setListarEtapas] = useState<number>(1);
  return (
    <>
      <h1 className="text-center text-white font-bold text-3xl mt-8 uppercase drop-shadow-[1px_2px_0px_black]">
        Etapas
      </h1>
      <div className="flex items-center justify-center mt-8 gap-2 md:gap-6">
        <Button
          text="Etapas Aprobadas"
          estado={1}
          setEstado={setListarEtapas}
          classCSS="border-[#42d340] shadow-green-500"
        ></Button>
        <Button
          text="Etapas Rechazadas"
          estado={2}
          setEstado={setListarEtapas}
          classCSS="border-[#f66c79] shadow-[#f66c79]"
        ></Button>
        <Button
          text="Etapas En Proceso"
          estado={3}
          setEstado={setListarEtapas}
          classCSS="border-[#879efc] shadow-[#879efc]"
        ></Button>
      </div>
      {/* {listarEtapas == 1 && ( */}
      <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
        {etapasTotales.map((etapa) => {
          if (etapa.estado == listarEtapas) {
            return (
              <EtapaDescripcion
                etapa={etapa}
                classCSS={`${etapa.estado == 1 && "bg-[#affdce]"} 
                        ${etapa.estado == 2 && "bg-red-400"}
                        ${etapa.estado == 3 && "bg-[#879efc]"}`}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default EtapasUsuario;

//Pagina que mostrará las etapas que corresponden al usuario en sesión, se obtiene todas las etapas
//que tiene el usuario y se clasifican por "Etapas Aprobadas", "Etapas Rechazadas" y "Etapas en Proceso"
