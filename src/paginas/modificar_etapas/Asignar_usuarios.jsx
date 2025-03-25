import fetch_all_usuarios from "../../hooks/fetch_all_usuarios";
import fetch_etapa_usuarios from "../../hooks/fetch_etapa_usuarios";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";
import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

function Asignar_usuarios() {
  const EtapaId = useParams().id; // Obtener el id de la etapa de la URL
  const { usuarios } = fetch_all_usuarios();
  const { usuariosEtapa } = fetch_etapa_usuarios({ EtapaId });
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda
  const [seleccionados, setSeleccionados] = useState([]); // Estado para los usuarios seleccionados
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false); // Estado para mostrar la confirmación de guardado
  const [datosConfirmados, setDatosConfirmados] = useState(); // Confirmación del envío del formulario

  // Sincronizar seleccionados con usuariosEtapa
  useEffect(() => {
    if (usuariosEtapa && usuariosEtapa) {
      setSeleccionados(usuariosEtapa);
    }
  }, [usuariosEtapa]);

  // Función para manejar la búsqueda
  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  // Función para agregar un usuario al hacer Click en el boton agregar
  const agregarUsuario = (usuario) => {
    if (
      !seleccionados.some((u) => u.CodigoEmpleado === usuario.CodigoEmpleado)
    ) {
      setSeleccionados([...seleccionados, usuario]);
    }
  };

  // Función para eliminar un usuario al hacer Click en el boton eliminar
  const eliminarUsuario = (usuario) => {
    setSeleccionados(
      seleccionados.filter((u) => u.CodigoEmpleado !== usuario.CodigoEmpleado)
    );
  };

  // Filtrar usuarios según la búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    // console.log(seleccionados);
    return usuario.Nombres.toLocaleLowerCase().includes(
      busqueda.toLocaleLowerCase()
    );
  });

  const handleEnviarDatos = async () => {
    const API = import.meta.env.VITE_API_URL;
    const headers = {
      EtapaId: EtapaId,
      Usuarios: seleccionados.map((usuario) => usuario),
    };
    console.log(headers);
    const resEtapaActualizada = await axios.post(
      `${API}/etapa/asignarUsuarios`,
      headers
    );

    if (resEtapaActualizada.status === 200) {
      console.log(resEtapaActualizada.mensaje);
      setDatosConfirmados(true);
    } else {
      setDatosConfirmados(false);
    }
  };

  return (
    <div className="flex flex-col flex-wrap sm:flex-row items-center sm:items-start justify-center mt-8 md:mt-16 text-white gap-8 md:gap-14">
      {/* Buscador de usuarios */}
      <div className="w-full flex flex-col items-center">
        <h2 className="font-bold mb-4 md:mb-8 text-xl sm:text-2xl lg:text-3xl uppercase drop-shadow-[2px_1px_1px_black]">
          Usuarios
        </h2>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={handleBusqueda}
          className="max-w-xs placeholder-white block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
      {/* Usuarios para agergar */}
      <div className="md:mr-12">
        <h2 className="mb-5 text-center text-lg sm:text-xl font-bold uppercase drop-shadow-[2px_1px_1px_black]">
          Resultados de búsqueda
        </h2>
        <ul className="flex flex-col max-h-[425px] overflow-auto pr-2 overscroll-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
          {busqueda != "" &&
            usuariosFiltrados.map((usuario) => (
              <div className="w-full" key={usuario.CodigoEmpleado}>
                <li className="bg-white text-xs md:text-sm text-black rounded-2xl text-center uppercase font-semibold py-3">
                  {usuario.Nombres} {usuario.Apellidos}
                </li>
                <button
                  className="mt-1 mb-7 p-1 rounded-2xl bg-green-500 font-semibold w-full"
                  onClick={() => agregarUsuario(usuario)} // Doble clic para agregar
                >
                  Agregar
                </button>
              </div>
            ))}
        </ul>
      </div>
      {/* Lista de usuarios seleccionados */}
      <div className="md:ml-12">
        <h2 className="mb-5 text-center text-lg sm:text-xl font-bold uppercase drop-shadow-[2px_1px_1px_black]">
          Usuarios Seleccionados
        </h2>
        <ul className="flex flex-col">
          {seleccionados.map((usuario) => (
            <div className="w-full" key={usuario.CodigoEmpleado}>
              <li
                className="bg-white text-xs md:text-sm text-black rounded-2xl text-center uppercase font-semibold py-3"
                key={usuario.CodigoEmpleado}
              >
                {usuario.Nombres} {usuario.Apellidos}
              </li>
              <button
                className="mt-1 mb-7 p-1 rounded-2xl bg-red-500 font-semibold w-full"
                onClick={() => eliminarUsuario(usuario)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </ul>
      </div>
      {/* Actualizar etapa */}
      <div className="w-full pt-2 md:pt-4 flex justify-center">
        <div className="w-full max-w-xs">
          <button
            typeof="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setMostrarConfirmacion(true);
            }}
          >
            Guardar
          </button>
        </div>
      </div>
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
          mensaje="Se ha actualizado la etapa correctamente!!"
        ></Alert>
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario haga clic en guardar y cancele la acción
          duracion={4000}
          bgColor="bg-red-300"
          mensaje="Se ha cancelado la acción!!"
        ></Alert>
      )}
    </div>
  );
}

export default Asignar_usuarios;
