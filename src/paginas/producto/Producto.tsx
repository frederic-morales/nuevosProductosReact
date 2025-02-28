import ListadoEtapas from "./ListadoEtapas";

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
