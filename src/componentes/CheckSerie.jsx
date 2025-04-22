import React, { useEffect, useState } from "react";

const CheckSerie = ({ onChange, hasError, serie, message, classCss }) => {
  // Estado para controlar cuál checkbox está seleccionado
  const [selectedOption, setSelectedOption] = useState(null);

  // Manejar el cambio de selección
  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      // Si el checkbox ya está seleccionado, deseleccionarlo
      setSelectedOption(null);
      onChange(option);
      // console.log(option);
    } else {
      // Seleccionar el nuevo checkbox
      setSelectedOption(option);
      onChange(option);
      // console.log(option);
    }
  };

  useEffect(() => {
    setSelectedOption(serie);
  }, [serie]);

  return (
    <div className="w-full max-w-sm md:mb-0 text-white text-start">
      <h2 className="block uppercase text-lg font-bold mb-2 md:text-xl lg:text-2xl drop-shadow-[1px_1px_1px_black] text-white lg:mb-5">
        {message && "SERIE PRODUCTO"}
      </h2>
      {/* Primer checkbox */}
      <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group mt-4">
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
        <span className={`font-bold md:text-lg ${classCss}`}>FARMA</span>
      </label>
      <br />
      {/* Segundo checkbox */}
      <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group mb-4">
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
        <span className={`font-bold md:text-lg ${classCss}`}>VET</span>
      </label>
      {hasError && (
        <p className="text-[#ff247f] text-xs font-bold md:text-sm drop-shadow-[0px_1px_0x_black] mb-2">
          Campo Obligatorio
        </p>
      )}
    </div>
  );
};

export default CheckSerie;
