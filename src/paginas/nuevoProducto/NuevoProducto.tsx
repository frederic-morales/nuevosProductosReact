import { useState, useMemo } from "react";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "./Campo";
import CheckEtapa from "./CheckEtapa";

// Tipo para mapear un array de elementos accediendo por el nombre del elemento
type Campos = {
  [key: string]: string;
};

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
            <Campo
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
              <CheckEtapa key={etapa} etapa={etapa} />
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
        <Alert // Cuando el usuario de click en guardar y cancele la accion
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción "
        ></Alert>
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y confirme la accion
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/home"
          mensaje="Se ha iniciado un nuevo desarrollo"
        ></Alert>
      )}
    </div>
  );
}

export default NuevoProducto;
