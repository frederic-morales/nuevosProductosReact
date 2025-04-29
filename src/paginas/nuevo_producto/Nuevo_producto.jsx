import { useState } from "react";
// import axios from "axios";
import api from "../../auth/axiosConfig";
//Componentes
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import Campo from "../../componentes/Campo";
import CheckEtapa from "../../componentes/CheckEtapa";
import Buscar_usuarios from "../../componentes/Buscar_usuario";
import CheckSerie from "../../componentes/CheckSerie";
//Hooks
import fetchDataProductos from "../../hooks/fetch_data_productos";
import fetch_all_etapas from "../../hooks/fetch_all_etapas";
import fetch_usuarios_grupo from "../../hooks/fetch_usuarios_grupo";

function NuevoProducto() {
  const { campos, loadingCampos, errorCampos } = fetchDataProductos(); // Usa el custom hook para obtener las etapas y los campos
  const { grupoUsuarios, loadingGrupo, errorGrupo } = fetch_usuarios_grupo({
    CodigoGrupo: 35, // INVESTIGACION
  });
  const { allEtapas, loading, error } = fetch_all_etapas(); // Usa el custom hook para obtener las etapas

  const [validarCampos, setValidarCampos] = useState(false); // Validar que los campos requeridos no estén vacíos
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(); // Mostrar confirmación
  // Estados para manejar los datos ingresados en el formulario
  const [camposNuevos, setCamposNuevos] = useState({}); // Valores ingresados por el usuario a enviar
  const [etapasAsignadas, setEtapasAsignadas] = useState([]); // Manejar las etapas a enviar
  const [usuarioResponsable, setUsuarioResponsable] = useState(""); // Usuario responsable del producto
  const [serie, setSerie] = useState(""); // Serie del producto

  // Inicializa los campos nuevos con los nombres de las columnas
  if (campos.length > 0 && Object.keys(camposNuevos).length === 0) {
    campos.forEach((column) => {
      if (
        column.columnName === "Nombre" ||
        column.columnName === "Descripcion"
      ) {
        camposNuevos[column.columnName] != "";
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
    // console.log(usuarioResponsable);
  };

  // se modifica etapasAsignadas cada vez que el usuario de check o uncheck en cada etapa
  const handleToggleEtapa = (etapa, isChecked) => {
    setEtapasAsignadas(
      (prevEtapas) =>
        isChecked
          ? [...prevEtapas, etapa] // Agregar si se marca
          : prevEtapas.filter((e) => e.EtapaId !== etapa.EtapaId) // Eliminar si se desmarca
    );
  };

  //Se envian los datos al usuario confirmar el envio de los datos
  const handleEnviarDatos = async () => {
    // const API = import.meta.env.VITE_API_URL;
    const resProducto = await api.post(`/producto/create`, {
      nombre: camposNuevos.Nombre,
      descripcion: camposNuevos.Descripcion,
      usuario: usuarioResponsable.Usuario,
      serie: serie,
    });

    // console.log(usuarioResponsable.Usuario);
    const nuevoProducto = await resProducto.data.nuevoProductoId; // Obtiene el Id generado del Producto nuevo
    await api.post(`/producto/asignarEtapas`, {
      desarrolloProducto: nuevoProducto,
      etapasProd: etapasAsignadas,
    });
    // console.log(resAsignarEtapas.data);
  };

  // VERIFICAR SI TODOS LOS CAMPOS ESTAN COMPLETOS
  const validateField = () => {
    const camposCompletos = Object.values(camposNuevos).every(
      (val) => val.trim() != ""
    );
    setValidarCampos(camposCompletos);
  };

  if (loadingCampos || loading || loadingGrupo) {
    return <div>Cargando...</div>;
  }

  if (errorCampos || error || errorGrupo) {
    return <div>Error: {errorCampos}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-12 ">
      <h2 className="text-xl font-black md:text-2xl lg:text-4xl text-white uppercase drop-shadow-[1px_2px_0px_black]">
        Nuevo Producto
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
                hasError={!camposNuevos[campo.columnName]} // Verifica que cada campo no esté vacío
              />
            ) : (
              ""
            )
          )}
          {/* Usuario Responsable */}
          {grupoUsuarios?.length > 0 && (
            <Buscar_usuarios
              usuarios={grupoUsuarios}
              onSelect={(usuario) => {
                setUsuarioResponsable(usuario);
                // console.log(usuario);
                // console.log(usuario.Usuario);
              }} // Recibe el usuario seleccionado
              hasError={!usuarioResponsable}
            />
          )}
          {/* FARMA O VET */}
          <CheckSerie onChange={setSerie} hasError={!serie} />
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mb-8 mt-12 md:mt-16 flex flex-col items-center">
          <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
            Etapas que llevará el producto
          </p>
          <div className="mt-5 md:mt-10 lg:mt-12 lg:px-6 p-3 sm:pt-6 sm:pb-10 sm:px-4 w-full max-w-lg lg:max-w-7xl flex flex-wrap gap-4 justify-evenly items-start">
            {allEtapas.map((etapa) => (
              <CheckEtapa
                key={etapa.EtapaId}
                etapa={etapa}
                onToggle={handleToggleEtapa}
                classCSS={"text-black"}
                showCheck={true}
              />
            ))}
          </div>
        </div>
        {/* Botón */}
        {validarCampos && etapasAsignadas?.length > 0 && (
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

export default NuevoProducto;
