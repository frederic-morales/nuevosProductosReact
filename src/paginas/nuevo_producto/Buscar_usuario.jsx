import React, { useState } from "react";

function Buscar_usuarios({ usuarios, onSelect }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [selectedUser, setSelectedUser] = useState(""); // Estado para almacenar el usuario seleccionado
  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtrar usuarios por nombre o apellido

  const handleSelect = (e) => {
    setSelectedUser(e.target.value);
    onSelect(
      usuarios.find(
        (usuario) => usuario.CodigoEmpleado === parseInt(e.target.value)
      )
    );
  }; // Actualizar el usuario seleccionado

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0 text-white text-center">
      <label className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-2xl drop-shadow-[1px_1px_1px_black]">
        Usuario Responsable
      </label>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuario por nombre o apellido..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-50 text-black focus:bg-blue-50 py-3 px-4 rounded-t-lg focus:outline-none focus:shadow-xl focus:shadow-blue-300"
      />

      {/* Menú desplegable */}
      <select
        value={selectedUser}
        onChange={(e) => handleSelect(e)}
        className="w-full bg-gray-50 text-black focus:bg-blue-50 py-3 px-4 mb-3 rounded-b-lg focus:outline-none focus:shadow-xl focus:shadow-blue-300"
      >
        <option value="">Selecciona un usuario</option>
        {filteredUsuarios.map((usuario) => (
          <option
            value={usuario.CodigoEmpleado}
            key={usuario.CodigoEmpleado}
            className="uppercase"
          >
            {usuario.Nombres} {usuario.Apellidos}
          </option>
        ))}
      </select>

      {/* Mostrar el usuario seleccionado */}
      {selectedUser && (
        <p className="w-full bg-gray-50 text-black focus:bg-blue-50 rounded py-3 text-xs px-4 mb-3 focus:outline-none focus:shadow-xl focus:shadow-blue-300 uppercase font-semibold">
          Usuario seleccionado: <br />{" "}
          <b>
            {
              usuarios.find(
                (usuario) => usuario.CodigoEmpleado === parseInt(selectedUser)
              ).Nombres
            }
            {
              usuarios.find(
                (usuario) => usuario.CodigoEmpleado === parseInt(selectedUser)
              ).Apellidos
            }
          </b>
        </p>
      )}
    </div>
  );
}

export default Buscar_usuarios;
