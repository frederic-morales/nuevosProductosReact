import { useState } from "react";
import Actualizar from "./Actualizar";
import Historial from "./Historial";

function Etapa() {
  const [mostrarHistorial, setMostrarHistorial] = useState<boolean>(false);
  const [texto, setTexto] = useState<string>("Actualizar Etapa");

  const handleMostrarHistorial = () => {
    if (!mostrarHistorial) {
      setMostrarHistorial(true);
      setTexto("Historial de actualizaciones");
    } else {
      setMostrarHistorial(false);
      setTexto("Actualizar Etapa");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 mb-16">
      {/* Titutlo del producto y de la etapa correspondiente */}
      <div className="w-[95%] sm:w-9/12">
        <h2 className="text-2xl text-center">Etapa 1 Producto 1</h2>
        <h4 className="text-lg font-bold py-2 text-center text-blue-400">
          Etapa en Proceso
        </h4>
        <button
          className="text-start cursor-pointer rounded-sm py-1 px-3 font-medium bg-gray-100 hover:bg-orange-300"
          onClick={handleMostrarHistorial}
        >
          {texto}
        </button>
      </div>
      {!mostrarHistorial ? (
        /* Renderizar actualizar Etapa */
        <Actualizar />
      ) : (
        /* Renderizar historial de la Etapa */
        <Historial />
      )}
    </div>
  );
}

export default Etapa;
