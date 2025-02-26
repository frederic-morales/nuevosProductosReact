import { useState, ChangeEvent, useMemo } from "react";
import Confirmacion from "../componentes/Confirmacion";
import Alert from "../componentes/Alert";

// Interfaz para paraserle los parametros a las funciones también llamados "PROPS en REACT"
interface AsignarEtapaProps {
  etapa: string;
}

interface LlenarCampoProps {
  valor: string;
  keyName: string;
  onChange: (valor: string) => void; // funcion pasada como "PROP"
  hasError?: boolean;
}

// Tipo para mapear un array de elementos accediendo por el nombre del elemento
type Campos = {
  [key: string]: string;
};

function AsignarEtapa({ etapa }: AsignarEtapaProps) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group mt-3">
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <span
        className={`flex items-center justify-center w-6 h-6 border-2 rounded-md
        ${
          isChecked
            ? "bg-blue-500 border-blue-500 group-hover:bg-blue-600 group-hover:border-blue-600"
            : "bg-white border-gray-400 group-hover:border-blue-400"
        }`}
      >
        <svg
          className={`w-4 h-4 text-white transition-opacity ${
            isChecked ? "opacity-100" : "opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <span className="font-medium">{etapa}</span>
    </label>
  );
}

function LlenarCampo({ valor, keyName, onChange, hasError }: LlenarCampoProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0">
      <label
        className="block uppercase text-xs font-bold mb-2"
        htmlFor="nombreProducto"
      >
        {keyName}
      </label>
      <input
        className="w-full bg-gray-50 focus:bg-blue-50 rounded py-3 px-4 mb-3 focus:outline-none"
        id="nombreProducto"
        type="text"
        placeholder="Ingrese el nombre del producto"
        value={valor}
        onChange={handleChange}
      />
      {/* Solo se mostrará si el campo esta vacio */}
      {hasError && (
        <p className="text-red-500 text-xs font-semibold">Campo Obligatorio</p>
      )}
    </div>
  );
}

function NuevoProducto() {
  //Campos a renderizar
  const [campos, setCampos] = useState<Campos>({
    nombre: "",
    descripcion: "",
    informacion: "",
    camp01: "",
    campo2: "",
  });
  const etapas = [
    "Etapa 1",
    "Etapa 2",
    "Etapa 3",
    "Etapa 4",
    "Etapa 5",
    "Etapa 6",
  ];
  const [datosConfirmados, setDatosConfirmados] = useState<boolean | null>(
    null
  );

  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState<boolean>(false);

  const camposLlenos = useMemo(() => {
    return Object.values(campos).every((valor) => valor.trim() !== ""); //verifica que un campo no este vacio
  }, [campos]); //Se ejecuta cada vez que "campos" cambia, osea cada vez que el usuario cambia el valor en un campo

  const handleChange = (campoId: string, valor: string) => {
    setCampos((prev) => ({
      ...prev, // prev obiente el ultimo estado de campos
      [campoId]: valor, // se actualiza solo el campo seleccionado
    }));
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-12 ">
      <h2 className="text-xl font-semibold">Nuevo Producto</h2>
      <form className="w-full mt-10 h-full">
        <div className="w-full flex gap-4 justify-center  flex-wrap">
          {Object.keys(campos).map((campoId) => (
            <LlenarCampo
              key={campoId}
              keyName={campoId}
              valor={campos[campoId]}
              onChange={(valor) => handleChange(campoId, valor)} // valor es el texto ingresado por el usuario
              hasError={campos[campoId].trim() === ""} //Verificamos si el campo esta vacio
            />
          ))}
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mb-8 mt-12 flex flex-col items-center">
          <p className="w-full max-w-sm font-semibold sm:text-center">
            Etapas que llevara el producto
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full">
            {etapas.map((etapa) => (
              <AsignarEtapa key={etapa} etapa={etapa} />
            ))}
          </div>
        </div>
        {/* Boton */}
        {camposLlenos && (
          <div className="w-full pt-12 flex justify-center">
            <div className="w-full max-w-sm">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setMostrarConfirmacion(true)}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </form>
      {mostrarConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de realizar esta accion?"
          handleConfirm={(value) => {
            setDatosConfirmados(value);
            setMostrarConfirmacion(false);
          }}
        />
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y confirme la accion
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción"
        ></Alert>
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y cancele la accion
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/home"
          mensaje="Se ha cancelado la acción"
        ></Alert>
      )}
    </div>
  );
}

export default NuevoProducto;
