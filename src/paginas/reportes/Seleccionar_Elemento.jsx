import { useState } from "react";

function Seleccionar_Elemento({ data, onSelect, hasError, titulo }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [selectedData, setSelectedData] = useState(""); // Estado para almacenar el usuario seleccionado

  const filteredData = data.filter((elemento) =>
    elemento.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtrar usuarios por nombre o apellido

  const handleSelect = (e) => {
    // console.log(e.target.value);
    setSelectedData(e.target.value);
    onSelect(data.find((elemento) => elemento?.Nombre === e.target.value));
  }; // Actualizar el usuario seleccionado
  // console.log(selectedData);

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0 text-white ">
      <label className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-2xl drop-shadow-[1px_1px_1px_black]">
        {titulo}
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
        value={selectedData}
        onChange={(e) => handleSelect(e)}
        className="w-full bg-gray-50 text-black focus:bg-blue-50 py-3 px-4 mb-3 rounded-b-lg focus:outline-none focus:shadow-xl focus:shadow-blue-300"
      >
        <option value="">SELECCIONA</option>
        {filteredData?.map((elemento) => (
          <option
            value={elemento?.Nombre}
            key={elemento?.Nombre}
            className="uppercase"
          >
            {elemento?.Nombre}
          </option>
        ))}
      </select>
      {hasError && (
        <p className="text-[#ff247f] text-xs font-bold md:text-sm drop-shadow-[0px_1px_0x_black]">
          Campo Obligatorio
        </p>
      )}
    </div>
  );
}

export default Seleccionar_Elemento;
