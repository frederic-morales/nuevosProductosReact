import CheckEtapa from "../../componentes/CheckEtapa";

interface campoLlenoProps {
  titulo: string;
  valor: string;
}

function CampoLleno(props: campoLlenoProps) {
  const { titulo, valor } = props;

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0 text-white">
      <p className="block uppercase text-xs font-bold mb-2 md:text-sm lg:text-lg drop-shadow-[1px_1px_1px_black]">
        {titulo}
      </p>
      <p className="w-full bg-gray-50 text-black focus:bg-blue-50 rounded py-3 px-4 mb-3 focus:outline-none focus:shadow-xl focus:shadow-blue-300 font-semibold">
        {valor}
      </p>
    </div>
  );
}

function ReasignarEtapas() {
  const etapas = [
    "Etapa 1",
    "Etapa 2",
    "Etapa 3",
    "Etapa 4",
    "Etapa 5",
    "Etapa 6",
    "Etapa 6",
  ];
  const campos = ["Campo 0", "Campo 1", "Campo 2", "Campo 3"];

  return (
    <div className="w-full mt-10 h-full">
      {/* Informacion del producto */}
      <div className="w-full flex gap-4 justify-center flex-wrap">
        {campos.map((campo) => (
          <CampoLleno titulo={campo} valor="Nombre dado" />
        ))}
      </div>
      {/* Reasignacion de las Etapas */}
      <div className="w-full mb-8 mt-12 md:mt-16 flex flex-col items-center">
        <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_1px_1px_black]">
          Reasigna Las Etapas
        </p>
        <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full">
          {etapas.map((etapa) => (
            <CheckEtapa key={etapa} etapa={etapa} />
          ))}
        </div>
      </div>
      {/* Boton guardar */}
      <div className="w-full pt-12 flex justify-center">
        <div className="w-full max-w-sm">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReasignarEtapas;
