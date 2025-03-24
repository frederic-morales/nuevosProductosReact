import fetch_all_etapas from "../../hooks/fetch_all_etapas";
import EtapaDescripcion from "../../componentes/EtapaDescripcion";

function Modificar_etapas() {
  const { allEtapas, loading, error } = fetch_all_etapas();

  // console.log(etapas);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-14 text-white">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl uppercase drop-shadow-[2px_1px_1px_black]">
          Etapas
        </h1>
        {/* Etapas */}
        <div className="w-w-full flex flex-wrap items-center justify-center gap-8 mt-8">
          {allEtapas.map((etapa) => (
            <EtapaDescripcion
              key={etapa.EtapaId}
              etapa={etapa}
              classCSS={"bg-gray-100"}
              link={`${etapa.EtapaId}/asignar_usuarios`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Modificar_etapas;
