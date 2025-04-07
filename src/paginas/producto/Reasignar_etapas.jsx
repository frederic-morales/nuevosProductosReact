import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
//Componentes
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import CheckEtapa from "../../componentes/CheckEtapa";
//Hooks
import fetch_Producto_Info from "../../hooks/fetch_producto_info";

import { useOutletData } from "./OutletProductoContexts";

function Actualizar_Producto() {
  const params = useParams();
  const productoId = params.productoId; // Obtiene el id del producto a Actualizar
  const { etapas } = useOutletData(); // Obtiene las etapas asignadas anteriormente

  // const { usuarios, loadingUsuarios, errorUsuarios } = fetch_all_usuarios(); // Usa el custom hook para obtener los usuarios
  const { info, errorInfo, loadingInfo } = fetch_Producto_Info({
    productoId,
  });

  const [validarCampos, setValidarCampos] = useState(false); // Validar que los campos requeridos no estén vacíos
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación

  // Estados para manejar los datos ingresados en el formulario
  const [etapasAsignadas, setEtapasAsignadas] = useState([]); // Manejar las etapas a enviar

  // se modifica etapasAsignadas cada vez que el usuario de check o uncheck en cada etapa
  const handleToggleEtapa = (etapa, isChecked) => {
    setEtapasAsignadas(
      (prevEtapas) =>
        isChecked
          ? [...prevEtapas, etapa] // Agregar si se marca
          : prevEtapas.filter((e) => e.EtapaId !== etapa.EtapaId) // Eliminar si se desmarca
    );
  };

  console.log(info);
  console.log(etapas);

  return (
    <div className="flex flex-col items-center mt-8 md:mt-12">
      <form className="w-full h-full">
        {/* Asignar Etapas */}
        <div className="mb-8 flex flex-col items-center">
          <p className="w-full text-center max-w-sm md:max-w-xl font-black sm:text-center text-lg md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Reasignar etapas aprobadas
          </p>
          <div className="w-fit mt-5 md:mt-10 lg:mt-12 lg:px-6 p-3 sm:pt-6 sm:pb-10 sm:px-4 justify-center flex flex-wrap gap-4 rounded-2xl opacity-95">
            {etapas.length > 0 &&
              etapas.map((etapa) => {
                if (etapa.ProgresoEstado !== null) {
                  return (
                    <CheckEtapa
                      key={etapa.EtapaId}
                      etapa={etapa}
                      onToggle={handleToggleEtapa}
                      classCSS={`${
                        etapa.ProgresoEstado == 1 && "text-green-600 "
                      }
                        ${etapa.ProgresoEstado == 2 && "text-red-500"}
                        ${etapa.ProgresoEstado == 3 && "text-[#879efc]"}
                        `}
                      showCheck={true}
                    />
                  );
                }
              })}
          </div>
        </div>
        {/* Botón */}
        {/* Se mostrará el boton solamente si alguno de los campos cambia */}
        {(validarCampos || etapasAsignadas.length > 0) && (
          <div className="w-full pt-12 flex justify-center">
            <div className="w-full max-w-sm">
              <button
                typeof="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 font-semibold rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  setMostrarConfirmacion(true);
                }}
              >
                Actualizar Producto
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
          // onSubmit={actualizarDatos}
        />
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y confirme la acción
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/Producto/All"
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

export default Actualizar_Producto;
