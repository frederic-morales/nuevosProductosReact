import React, { useState } from "react";

const CheckSerie = ({ onChange }) => {
  // Estado para controlar cuál checkbox está seleccionado
  const [selectedOption, setSelectedOption] = useState(null);

  // Manejar el cambio de selección
  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      // Si el checkbox ya está seleccionado, deseleccionarlo
      setSelectedOption(null);
      onChange(option);
      console.log(option);
    } else {
      // Seleccionar el nuevo checkbox
      setSelectedOption(option);
      onChange(option);
      console.log(option);
    }
  };

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0 text-white text-center">
      <h2 className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-2xl drop-shadow-[1px_1px_1px_black] text-white lg:mb-10">
        SERIE PRODUCTO
      </h2>
      {/* Primer checkbox */}
      <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group">
        <input
          type="checkbox"
          className="absolute opacity-0 h-0 w-0"
          checked={selectedOption === "F"}
          onChange={() => handleCheckboxChange("F")}
        />
        <span
          className={`flex items-center justify-center w-6 h-6 border-2 rounded-md
        ${
          selectedOption === "F"
            ? "bg-blue-500 border-blue-500 group-hover:bg-blue-600 group-hover:border-blue-600"
            : "bg-white border-gray-400 group-hover:border-blue-400"
        }`}
        >
          <svg
            className={`w-4 h-4 text-white transition-opacity ${
              selectedOption === "F" ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <span className="font-bold md:text-lg text-white drop-shadow-[1px_1px_1px_black]">
          FARMA
        </span>
      </label>
      <br />
      {/* Segundo checkbox */}
      <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group">
        <input
          type="checkbox"
          className="absolute opacity-0 h-0 w-0"
          checked={selectedOption === "V"}
          onChange={() => handleCheckboxChange("V")}
        />
        <span
          className={`flex items-center justify-center w-6 h-6 border-2 rounded-md
        ${
          selectedOption === "V"
            ? "bg-blue-500 border-blue-500 group-hover:bg-blue-600 group-hover:border-blue-600"
            : "bg-white border-gray-400 group-hover:border-blue-400"
        }`}
        >
          <svg
            className={`w-4 h-4 text-white transition-opacity ${
              selectedOption === "V" ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <span className="font-bold md:text-lg text-white drop-shadow-[1px_1px_1px_black]">
          VET
        </span>
      </label>
    </div>
  );
};

export default CheckSerie;
