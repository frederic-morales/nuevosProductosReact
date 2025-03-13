import { useState } from "react";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "./Campo";
import CheckEtapa from "../../componentes/CheckEtapa";
import fetchDataProducto from "../../hooks/fetchDataProducto";

function NuevoProducto() {
  // Usa el custom hook para obtener las etapas y los campos
  const { etapas, campos, loading, error } = fetchDataProducto();

  const [camposNuevos, setCamposNuevos] = useState({}); // Valores ingresados por el usuario a enviar
  const [validarCampos, setValidarCampos] = useState(false); // Validar que los campos requeridos no estén vacíos
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación

  // Inicializa los campos nuevos con los nombres de las columnas
  if (campos.length > 0 && Object.keys(camposNuevos).length === 0) {
    campos.forEach((column) => {
      if (
        column.columnName === "Nombre" ||
        column.columnName === "Descripcion"
      ) {
        camposNuevos[column.columnName] = "";
      }
    });
  }

  const handleChange = (campoNombre, valor) => {
    setCamposNuevos((prevCampos) => ({
      ...prevCampos,
      [campoNombre]: valor,
    }));

    validateField();
  };

  // Verificar si todos los campos están completos
  const validateField = () => {
    const camposCompletos = Object.values(camposNuevos).every(
      (val) => val.trim() != ""
    );
    setValidarCampos(camposCompletos);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-12 ">
      <h2 className="text-xl font-black md:text-2xl lg:text-4xl text-white uppercase drop-shadow-[1px_2px_0px_black]">
        Nuevo Producto
      </h2>
      <form className="w-full mt-10 h-full">
        {/* Campos */}
        <div className="w-full flex gap-4 justify-center flex-wrap">
          {campos.map((campo) =>
            campo.columnName === "Nombre" ||
            campo.columnName === "Descripcion" ? (
              <Campo
                key={campo.ordinalPosition}
                keyName={campo.columnName}
                onChange={(valor) => handleChange(campo.columnName, valor)}
                hasError={!camposNuevos[campo.columnName]} // Verifica que cada campo no esté vacío
              />
            ) : (
              ""
            )
          )}
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mb-8 mt-12 md:mt-16 flex flex-col items-center">
          <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Etapas que llevará el producto
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full">
            {etapas.map((etapa) => (
              <CheckEtapa key={etapa.EtapaId} Nombre={etapa.Nombre} />
            ))}
          </div>
        </div>
        {/* Botón */}
        {validarCampos && (
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
          mensaje="¿Está seguro de realizar esta acción?"
          handleConfirm={(value) => {
            setDatosConfirmados(value);
            setMostrarConfirmacion(false);
          }}
        />
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y cancele la acción
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción"
        ></Alert>
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y confirme la acción
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/"
          mensaje="Se ha iniciado un nuevo desarrollo"
        ></Alert>
      )}
    </div>
  );
}

export default NuevoProducto;
