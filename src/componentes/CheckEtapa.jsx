import { useState } from "react";

function CheckEtapa(etapa) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <label className="w-full max-w-sm flex items-center space-x-3 cursor-pointer group mt-3">
      <input
        type="checkbox"
        className="absolute opacity-0 h-0 w-0"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <span
        className={`flex items-center justify-center w-6 h-6 border-2 rounded-md
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
      <span className="font-bold md:text-lg text-white drop-shadow-[1px_1px_1px_black]">
        {etapa.EtapaId}
        {etapa.Nombre}
      </span>
    </label>
  );
}

export default CheckEtapa;
