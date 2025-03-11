import CheckEtapa from "../../componentes/CheckEtapa";
import Alert from "../../componentes/Alert";
import Confirmacion from "../../componentes/Confirmacion";
import { useState } from "react";

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
  const [datosConfirmados, setDatosConfirmados] = useState<boolean | null>(
    null
  );
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState<boolean>(false);

  const etapas = [
    "Etapa 1",
    "Etapa 2",
    "Etapa 3",
    "Etapa 4",
    "Etapa 5",
    "Etapa 6",
  ];
  const campos = ["Campo 0", "Campo 1", "Campo 2", "Campo 3"];

  return (
    <div className="w-full mt-10 h-full">
      {/* Informacion del producto */}
      <div className="w-full flex gap-4 justify-center flex-wrap">
        {campos.map((campo) => (
          <CampoLleno
            titulo={campo}
            valor="Valor dado al iniciar el desarrollo"
          />
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
            className="w-full text-white py-3 px-8 bg-blue-500 rounded-3xl shadow-md shadow-blue-500 sm:text-lg hover:bg-blue-700"
            type="button"
            onClick={() => setMostrarConfirmacion(true)}
          >
            Guardar
          </button>
        </div>
      </div>
      {mostrarConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de realizar esta accion?"
          handleConfirm={(value) => {
            setDatosConfirmados(value);
            setMostrarConfirmacion(false);
          }}
        />
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y confirme la accion
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/"
          mensaje="Se han reasignado las etapas correctamente!!"
        ></Alert>
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y cancele la accion
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la reasignacion de las etapas!!"
        ></Alert>
      )}
    </div>
  );
}

export default ReasignarEtapas;
