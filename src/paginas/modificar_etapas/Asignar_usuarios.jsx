import fetch_all_usuarios from "../../hooks/fetch_all_usuarios";
import { useState } from "react";

function Asignar_usuarios() {
  const { usuarios } = fetch_all_usuarios();
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda
  const [seleccionados, setSeleccionados] = useState([]); // Estado para los usuarios seleccionados

  // Función para manejar la búsqueda
  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  // Función para agregar un usuario al hacer doble clic
  const agregarUsuario = (usuario) => {
    if (
      !seleccionados.some((u) => u.CodigoEmpleado === usuario.CodigoEmpleado)
    ) {
      setSeleccionados([...seleccionados, usuario]);
    }
  };

  // Función para eliminar un usuario de la lista de seleccionados
  const eliminarUsuario = (usuario) => {
    setSeleccionados(
      seleccionados.filter((u) => u.CodigoEmpleado !== usuario.CodigoEmpleado)
    );
  };

  // Filtrar usuarios según la búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    console.log(busqueda);
    console.log(usuario.Nombres.toLocaleLowerCase());
    return usuario.Nombres.toLocaleLowerCase().includes(
      busqueda.toLocaleLowerCase()
    );
  });

  console.log(usuariosFiltrados);

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
          className="max-w-xs placeholder-white block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        />
      </div>
      {/* Usuarios para agergar */}
      <div className="mr-12">
        <h2 className="mb-5 text-center text-lg sm:text-xl font-bold uppercase drop-shadow-[2px_1px_1px_black]">
          Resultados de búsqueda
        </h2>
        <ul className="flex flex-col">
          {usuariosFiltrados.map((usuario) => (
            <>
              <li
                className="bg-white text-xs md:text-sm text-black rounded-2xl py-2 text-center"
                key={usuario.id}
              >
                {usuario.Nombres}
              </li>
              <button
                className="mt-1 mb-7 rounded-2xl bg-green-500 font-semibold"
                onClick={() => agregarUsuario(usuario)} // Doble clic para agregar
              >
                Agregar
              </button>
            </>
          ))}
        </ul>
      </div>
      {/* Lista de usuarios seleccionados */}
      <div className="ml-12">
        <h2 className="mb-5 text-center text-lg sm:text-xl font-bold uppercase drop-shadow-[2px_1px_1px_black]">
          Usuarios Seleccionados
        </h2>
        <ul className="flex flex-col">
          {seleccionados.map((usuario) => (
            <>
              <li
                className="bg-white text-xs md:text-sm text-black rounded-2xl py-2 text-center"
                key={usuario.id}
              >
                {usuario.Nombres}
              </li>
              <button
                className="mt-1 mb-7 rounded-2xl bg-red-500 font-semibold"
                onClick={() => eliminarUsuario(usuario)}
              >
                Eliminar
              </button>
            </>
          ))}
        </ul>
      </div>
      {/* Actualizar etapa */}
      <div className="w-full flex flex-col items-center">
        <button>Actualizar</button>
      </div>
    </div>
  );
}

export default Asignar_usuarios;
