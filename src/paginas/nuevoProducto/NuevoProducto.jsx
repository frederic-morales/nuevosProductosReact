import { useState } from "react";
import axios from "axios";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "./Campo";
import CheckEtapa from "../../componentes/CheckEtapa";
import fetchDataProducto from "../../hooks/fetchDataProducto";

function NuevoProducto() {
  const { etapas, campos, loading, error } = fetchDataProducto(); // Usa el custom hook para obtener las etapas y los campos
  const [camposNuevos, setCamposNuevos] = useState({}); // Valores ingresados por el usuario a enviar
  const [validarCampos, setValidarCampos] = useState(false); // Validar que los campos requeridos no estén vacíos
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación
  const [response, setResponse] = useState(); // Para manejar la respuesta al enviar el formulario

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

  // se llena camposNuevos con los valores que ingresa el usuario
  const handleChange = (campoNombre, valor) => {
    setCamposNuevos((prevCampos) => ({
      ...prevCampos,
      [campoNombre]: valor,
    }));
    validateField();
  };

  //Al usuario confirmar el envio de los datos
  const handleEnviarDatos = async () => {
    const API = import.meta.env.VITE_API_URL;
    axios
      .post(`${API}/producto/create`, {
        nombre: camposNuevos.Nombre,
        descripcion: camposNuevos.Descripcion,
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        console.log("Error en el post:", err);
      });
    console.log(response);
    console.log(camposNuevos);
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
                typeof="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  setMostrarConfirmacion(true);
                }}
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
          onSubmit={handleEnviarDatos}
        />
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y confirme la acción
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/"
          mensaje="Se ha iniciado un nuevo desarrollo"
        ></Alert>
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y cancele la acción
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción"
        ></Alert>
      )}
    </div>
  );
}

export default NuevoProducto;
