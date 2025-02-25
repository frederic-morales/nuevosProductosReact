// import { NavLink } from "react-router";
import { NavLink } from "react-router-dom";

interface ListadoEtapasProps {
  titulo: string;
  color?: string;
  etapas?: Array<number>;
}

function ListadoEtapas({ titulo, color, etapas }: ListadoEtapasProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center rounded-2xl h-fit">
        <h4
          className={`text-lg font-bold border-b py-2 text-center text-${color}-400`}
        >
          {titulo}
        </h4>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 bg-white mt-8 text-xs md:text-sm">
          {etapas?.map((etapa) => (
            <div
              key={etapa}
              className={`w-full max-w-[250px] px-4 py-6 flex items-center justify-center shadow-3xl shadow-gray-100 rounded-2xl hover:bg-gray-100`}
            >
              <p className="text-sm text-navy-700">
                <NavLink to={"/Etapa"} className={"hover:text-[15px]"}>
                  <b>Etapa en proceso {etapa}</b>
                  <br /> Aprobada 20 de febrero de 2025
                  <br /> Usuario
                </NavLink>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Producto() {
  const etapasTotales = [1, 2, 3, 4, 5, 6, 7, 8];
  const etapasEnProceso = [1, 2, 3, 4];
  const etapasAprobadas = [1, 2, 3];
  const etapasRechazadas = [1, 2, 3];

  return (
    <div className="flex flex-col items-center">
      <div className="mt-12">
        <p className="text-center text-xl font-black ">Nombre del Producto</p>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-9 w-full ">
        {/* Etapas Totales */}
        <ListadoEtapas titulo="Etapas Totales" etapas={etapasTotales} />
        {/* Etapas en Proceso */}
        <ListadoEtapas
          titulo="Etapas En Proceso"
          color="blue"
          etapas={etapasEnProceso}
        />
        {/* Etapas Aprobadas */}
        <ListadoEtapas
          titulo="Etapas Aprobadas"
          color="green"
          etapas={etapasAprobadas}
        />
        {/* Etapas rechazadas */}
        <ListadoEtapas
          titulo="Etapas Rechazadas"
          color="red"
          etapas={etapasRechazadas}
        />
      </div>
    </div>
  );
}

export default Producto;
