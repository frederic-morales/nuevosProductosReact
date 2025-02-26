// import { NavLink } from "react-router";
import { NavLink } from "react-router-dom";

interface ListadoEtapasProps {
  titulo: string;
  bgColor?: string;
  etapas?: Array<number>;
}

function ListadoEtapas({ titulo, bgColor, etapas }: ListadoEtapasProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center rounded-2xl h-fit">
        <h4 className={`text-lg font-bold border-b py-2 text-center`}>
          {titulo}
        </h4>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 bg-white mt-8 text-xs md:text-sm">
          {etapas?.map((etapa) => (
            <NavLink to={"/Etapa"} key={etapa}>
              <div
                key={etapa}
                className={`w-full max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl ${bgColor} shadow-lg hover:shadow-cyan-200`}
              >
                <p className="text-sm text-navy-700">
                  <b>Etapa en proceso {etapa}</b>
                  <br /> Aprobada 20 de febrero de 2025
                  <br /> Usuario
                </p>
              </div>
            </NavLink>
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
    <div className="flex flex-col items-center mt-12 mb-20">
      <div className="">
        <p className="text-center text-xl font-black ">Nombre del Producto</p>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-6 w-full ">
        {/* Etapas Totales */}
        <ListadoEtapas titulo="Etapas Totales" etapas={etapasTotales} />
        {/* Etapas en Proceso */}
        <ListadoEtapas
          titulo="Etapas En Proceso"
          bgColor="bg-gray-100"
          etapas={etapasEnProceso}
        />
        {/* Etapas Aprobadas */}
        <ListadoEtapas
          titulo="Etapas Aprobadas"
          bgColor="bg-green-50"
          etapas={etapasAprobadas}
        />
        {/* Etapas rechazadas */}
        <ListadoEtapas
          titulo="Etapas Rechazadas"
          bgColor="bg-red-50"
          etapas={etapasRechazadas}
        />
      </div>
    </div>
  );
}

export default Producto;
