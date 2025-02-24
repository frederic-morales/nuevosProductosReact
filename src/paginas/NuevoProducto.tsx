import { useState } from "react";

function AsignarEtapa() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="flex items-center space-x-3 cursor-pointer group mt-3">
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <span
        className={`flex items-center justify-center w-6 h-6 border-2 rounded-md transition-all
        ${
          isChecked
            ? "bg-blue-500 border-blue-500 group-hover:bg-blue-600 group-hover:border-blue-600"
            : "bg-white border-gray-400 group-hover:border-blue-400"
        }`}
      >
        <svg
          className={`w-4 h-4 text-white transition-opacity ${
            isChecked ? "opacity-100" : "opacity-0"
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
      <span className="text-gray-700 select-none">
        {"Mostrar nombre de la etapa"}
      </span>
    </label>
  );
}

function NuevoProducto() {
  const etapas = [
    "Etapa 1",
    "Etapa 2",
    "Etapa 3",
    "Etapa 4",
    "Etapa 5",
    "Etapa 6",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <h2 className="text-xl ">Nuevo Producto</h2>
      <form className="w-full mt-10">
        {/* Info del Producto */}
        <div className="w-full flex gap-4 justify-center md:justify-between flex-wrap">
          {/* Nombre del Producto */}
          <div className="w-full max-w-sm mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nombreProducto"
            >
              Nombre del Producto
            </label>
            <input
              className="appearance-none w-full bg-gray-50 focus:bg-blue-50 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
              id="nombreProducto"
              type="text"
              placeholder="Ingrese el nombre del producto"
            />
            <p className="text-red-500 text-xs italic">Campo Obligatorio</p>
          </div>
          {/* Descripcion del Producto */}
          <div className="w-full max-w-sm mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="DescripcionProducto"
            >
              Descripcion del Producto
            </label>
            <input
              className="appearance-none w-full bg-gray-50 focus:bg-blue-50 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
              id="DescripcionProducto"
              type="text"
              placeholder="Ingrese el nombre del producto"
            />
            <p className="text-red-500 text-xs italic">Campo Obligatorio</p>
          </div>
          {/* Informacion adicional */}
          <div className="w-full max-w-sm mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nombreProducto"
            >
              Informacion Adicional
            </label>
            <input
              className="appearance-none w-full bg-gray-50 focus:bg-blue-50  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
              id="nombreProducto"
              type="text"
              placeholder="Ingrese el nombre del producto"
            />
            <p className="text-red-500 text-xs italic">Campo Obligatorio</p>
          </div>
        </div>
        {/* Asignar Etapas */}
        <div className="w-full mt-5 flex flex-col items-start max-w-sm">
          {etapas.map((etapa) => (
            <AsignarEtapa key={etapa} />
          ))}
        </div>
        {/* Boton */}
        <div className="mt-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoProducto;
