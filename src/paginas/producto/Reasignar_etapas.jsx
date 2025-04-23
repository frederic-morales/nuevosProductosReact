import { useState } from "react";
import { useParams } from "react-router-dom";
//Componentes
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import CheckEtapa from "../../componentes/CheckEtapa";
//Hooks
import { useOutletData } from "./OutletProductoContexts";
import post_etapas_reasignar from "../../hooks/post_etapas_reasignar";

function Actualizar_Producto() {
  const params = useParams();
  const productoId = params.productoId; // Obtiene el id del producto a Actualizar
  const { etapas, producto } = useOutletData(); // Obtiene las etapas asignadas anteriormente

  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación
  const [etapasAReasignar, setEtapasAReasignar] = useState([]); // Etapas a actualizar

  console.log(etapas);

  const handleToggleEtapa = (etapa, isChecked) => {
    setEtapasAReasignar(
      (prevEtapas) =>
        isChecked
          ? [...prevEtapas, etapa] // Agregar si se marca
          : prevEtapas.filter((e) => e.EtapaId !== etapa.EtapaId) // Eliminar si se desmarca
    );
  };

  const actualizarEtapas = async () => {
    await post_etapas_reasignar({
      DesarrolloProductoId: productoId,
      Etapas: etapasAReasignar,
      Correlativo: producto?.Rechazos,
    });
    // console.log(response);
  };

  // console.log(etapasAReasignar);

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
                if (
                  (etapa?.AsignacionEstado == 1 ||
                    etapa?.AsignacionEstado == 2) &&
                  producto?.Estado == 2 &&
                  !etapa?.Correlativo
                ) {
                  return (
                    <CheckEtapa
                      key={etapa.EtapaId}
                      etapa={etapa}
                      onToggle={handleToggleEtapa}
                      classCSS={`${
                        etapa.AsignacionEstado == 1 && "text-green-600 "
                      }
                        ${etapa.AsignacionEstado == 2 && "text-red-500"}
                        ${etapa.AsignacionEstado == 3 && "text-[#879efc]"}
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
        {etapasAReasignar?.length > 0 && (
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
          onSubmit={actualizarEtapas}
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
