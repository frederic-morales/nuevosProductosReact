import React, { useState } from "react";

function Seleccionar_Reporte({ reportes, onSelect, hasError }) {
  const [selectedItem, setSelectedItem] = useState(""); // Estado para almacenar el usuario seleccionado

  // const filteredUsuarios = usuarios.filter(
  //   (usuario) =>
  //     usuario.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     usuario.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  // ); // Filtrar usuarios por nombre o apellido

  const handleSelect = (e) => {
    setSelectedItem(e.target.value);
    onSelect(reportes.find((reporte) => reporte?.Nombre === e.target.value));
  }; // Actualizar el usuario seleccionado

  return (
    <div className="w-full max-w-sm mb-2 md:mb-0 text-white ">
      <label className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-2xl drop-shadow-[1px_1px_1px_black]">
        Reporte a generar
      </label>
      {/* Menú desplegable */}
      <select
        value={selectedItem}
        onChange={(e) => handleSelect(e)}
        className="w-full bg-gray-50 text-sm text-black focus:bg-blue-50 py-3 px-4 mb-3 rounded-b-lg focus:outline-none focus:shadow-xl focus:shadow-blue-300"
      >
        <option className="uppercase font-semibold" value="">
          SELECCIONA UN REPORTE
        </option>
        {reportes.map((reporte) => (
          <option
            value={reporte?.Nombre}
            key={reporte?.Id}
            className="uppercase"
          >
            {reporte.Nombre}
          </option>
        ))}
      </select>
      {/* Mostrar el usuario seleccionado */}
      {selectedItem && (
        <p className="w-full bg-gray-50 text-black focus:bg-blue-50 rounded py-3 text-xs px-4 mb-3 focus:outline-none focus:shadow-xl focus:shadow-blue-300 uppercase font-semibold">
          Reporte seleccionado: {selectedItem}
        </p>
      )}
      {hasError && (
        <p className="text-[#ff247f] text-xs font-bold md:text-sm drop-shadow-[0px_1px_0x_black]">
          Campo Obligatorio
        </p>
      )}
    </div>
  );
}

export default Seleccionar_Reporte;
