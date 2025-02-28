import { ChangeEvent } from "react";

interface CampoProps {
  valor: string;
  keyName: string;
  onChange: (valor: string) => void; // funcion pasada como "PROP"
  hasError?: boolean;
}

function Campo({ valor, keyName, onChange, hasError }: CampoProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mb-6 md:mb-0">
      <label
        className="block uppercase text-xs font-bold mb-2 md:text-sm lg:text-lg "
        htmlFor="nombreProducto"
      >
        {keyName}
      </label>
      <input
        className="w-full bg-gray-50 focus:bg-blue-50 rounded py-3 px-4 mb-3 focus:outline-none focus:shadow-xl focus:shadow-blue-300"
        id="nombreProducto"
        type="text"
        placeholder="Ingrese el nombre del producto"
        value={valor}
        onChange={handleChange}
      />
      {/* Solo se mostrará si el campo esta vacio */}
      {hasError && (
        <p className="text-red-600 text-xs font-medium md:text-sm">
          Campo Obligatorio
        </p>
      )}
    </div>
  );
}

export default Campo;
