import { NavLink } from "react-router-dom";
import { Etapa } from "../../interfaces/Etapa";

function ListadoEtapas() {
  //estados 1=Aprobada, 2=EnProceso, 3=Pendiente, 4=Rechazada
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
      estado: 2,
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
      estado: 2,
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
      estado: 3,
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
      estado: 3,
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
      estado: 3,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-6 w-full lg:mt-12">
        <div className="w-full flex flex-col items-center rounded-2xl h-fit">
          <h4
            className={`text-lg font-bold border-b py-2 text-center text-white md:text-2xl`}
          >
            {"Etapas Totales"}
          </h4>
          <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
            {etapasTotales?.map((etapa) => (
              <NavLink to={"/Etapa/Historial"}>
                <div
                  key={etapa.id}
                  className={`w-full min-w-[200px] max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95
                    ${etapa.estado == 1 && "bg-[#affdce]"} 
                    ${etapa.estado == 2 && "bg-[#ff6d68]"} 
                    ${etapa.estado == 3 && "bg-[#f3f3f3]"} 
                    ${etapa.estado == 4 && "bg-red-400"}`}
                >
                  <p className="text-xs md:text-sm text-black font-semibold">
                    <b>Etapa {etapa.nombre}</b>
                    <br /> Aprobada 20 de febrero de 2025
                    <br /> Usuario Responsable
                    <br /> Proceso Responsable
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListadoEtapas;
