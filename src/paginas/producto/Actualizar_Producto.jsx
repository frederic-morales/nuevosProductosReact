import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
//Componentes
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "../../componentes/Campo";
import CheckEtapa from "../../componentes/CheckEtapa";
import Buscar_usuarios from "../../componentes/Buscar_usuario";
import CheckSerie from "../../componentes/CheckSerie";
//Hooks
import fetch_all_usuarios from "../../hooks/fetch_all_usuarios";
import fetchDataProductos from "../../hooks/fetch_data_productos";
import fetch_all_etapas from "../../hooks/fetch_all_etapas";
import fetch_Producto_Info from "../../hooks/feth_producto_info";

function Actualizar_Producto() {
  const params = useParams();
  const productoId = params.id; // Obtiene el id del producto a Actualizar
  const etapas = useOutletContext();

  // Obtiene los datos de los productos
  const { campos, loadingCampos, errorCampos } = fetchDataProductos();
  const { usuarios, loadingUsuarios, errorUsuarios } = fetch_all_usuarios(); // Usa el custom hook para obtener los usuarios
  const { allEtapas, loading, error } = fetch_all_etapas(); // Usa el custom hook para obtener las etapas
  const { info, errorInfo, loadingInfo } = fetch_Producto_Info({
    productoId,
  });

  const [validarCampos, setValidarCampos] = useState(false); // Validar que los campos requeridos no estén vacíos
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación

  // Estados para manejar los datos ingresados en el formulario
  const [camposNuevos, setCamposNuevos] = useState({}); // Valores ingresados por el usuario a enviar
  const [etapasAsignadas, setEtapasAsignadas] = useState([]); // Manejar las etapas a enviar
  const [usuarioResponsable, setUsuarioResponsable] = useState(""); // Usuario responsable del producto
  const [serie, setSerie] = useState(""); // Serie del producto

  // Etapas a mostrar
  const mostrarNuevasEtapas = [];

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

  // se modifica etapasAsignadas cada vez que el usuario de check o uncheck en cada etapa
  const handleToggleEtapa = (etapa, isChecked) => {
    setEtapasAsignadas(
      (prevEtapas) =>
        isChecked
          ? [...prevEtapas, etapa] // Agregar si se marca
          : prevEtapas.filter((e) => e.EtapaId !== etapa.EtapaId) // Eliminar si se desmarca
    );
  };

  // Llenar
  allEtapas.forEach((etapa) => {
    let esta = false;
    etapas.forEach((etapaAsignada) => {
      if (etapa.EtapaId === etapaAsignada.EtapaId) {
        esta = true;
      }
    });
    if (!esta) {
      mostrarNuevasEtapas.push(etapa);
    }
  });

  const handleChange = (campoNombre, valor) => {
    setCamposNuevos((prevCampos) => ({
      ...prevCampos,
      [campoNombre]: valor,
    }));
    validateField();
  };

  const validateField = () => {
    const camposCompletos = Object.values(camposNuevos).every(
      (val) => val.trim() != ""
    );
    setValidarCampos(camposCompletos);
  };

  // console.log(etapas);
  // console.log(allEtapas);
  // console.log(mostrarNuevasEtapas);
  // console.log(info);

  if (loading || loadingCampos || loadingUsuarios || loadingInfo) {
    return <div>Cargando...</div>;
  }
  if (error || errorCampos || errorUsuarios || errorInfo) {
    return (
      <>
        <div>Error allEtapas: {error}</div>
        <div>Error campos: {errorCampos}</div>
        <div>Error usuarios: {errorUsuarios}</div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-12 ">
      <h2 className="text-xl font-black md:text-2xl lg:text-4xl text-white uppercase drop-shadow-[1px_2px_0px_black]">
        Actualizar Producto
      </h2>
      <form className="w-full mt-10 h-full">
        {/* Campos */}
        <div className="w-full flex gap-4 lg:gap-12 justify-center flex-wrap">
          {campos.map((campo) =>
            campo.columnName === "Nombre" ||
            campo.columnName === "Descripcion" ? (
              <Campo
                key={campo.ordinalPosition}
                keyName={campo.columnName}
                onChange={(valor) => handleChange(campo.columnName, valor)}
                hasError={false} // Verifica que cada campo no esté vacío
                placeholder={`${
                  info ? info.productoInfo[0][campo.columnName] : ""
                }`}
              />
            ) : (
              ""
            )
          )}
          {/* Usuario Responsable */}
          <Buscar_usuarios
            usuarios={usuarios}
            onSelect={(usuario) => setUsuarioResponsable(usuario)} // Recibe el usuario seleccionado
            hasError={false}
          />
          {/* FARMA O VET */}
          <CheckSerie onChange={setSerie} hasError={false} serie={"F"} />
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mb-8 mt-12 md:mt-16 flex flex-col items-center">
          <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center text-lg md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Etapas Asignadas Actualmente
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full">
            {etapas.map((etapa) => (
              <div
                key={etapa.EtapaId}
                className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group mt-3"
              >
                <p
                  className={`font-bold md:text-lg drop-shadow-[1px_1px_1px_black] ${
                    etapa.Estado == 1 && "text-green-300"
                  } ${etapa.Estado == 2 && "text-red-300"} 
                  ${
                    (etapa.Estado == 3 || etapa.Estado == null) && "text-white"
                  }`}
                >
                  {etapa.Nombre}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 w-full max-w-sm md:max-w-xl font-black sm:text-center text-lg md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Asignar más etapas
          </p>
          <div className="mt-5 flex flex-wrap gap-4 justify-center items-center w-full"></div>
          {mostrarNuevasEtapas.length > 0 &&
            mostrarNuevasEtapas.map((etapa) => {
              return (
                <CheckEtapa
                  key={etapa.EtapaId}
                  etapa={etapa}
                  onToggle={handleToggleEtapa}
                  classCSS={"text-white"}
                  showCheck={true}
                />
              );
            })}
        </div>
        {/* Botón */}
        {validarCampos && etapasAsignadas.length > 0 && (
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
          // onSubmit={handleEnviarDatos}
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

export default Actualizar_Producto;
