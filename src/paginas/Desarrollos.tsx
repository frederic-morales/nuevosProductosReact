import { NavLink } from "react-router";

function Desarrollos() {
  const desarrollosEnProceso = [1, 2, 3, 4];

  return (
    <div className="max-w-screen-xl mt-8 mx-auto  bg-white min-h-sceen text-xs shadow-xl rounded-2xl py-12">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-3xl mt-5 tracking-tight text-center">
          Desarrollos En Proceso
        </h2>
      </div>
      <div className="grid divide-y divide-neutral-200 w-[95%] max-w-3xl mx-auto mt-8">
        {desarrollosEnProceso.map((desarrollo) => (
          <div
            key={desarrollo}
            className="py-5 sm:text-base hover:bg-neutral-100 px-4"
          >
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span className="hover:text-blue-400">
                  Nombre del Producto {desarrollo}
                </span>
                <button>
                  <NavLink
                    to={"/Producto"}
                    className={"hover:bg-green-300 px-2 rounded-xl"}
                  >
                    Acceder
                  </NavLink>
                </button>

                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn text-start">
                Nombre del Producto en Desarrollo
                <br />
                Desarrollo Iniciado 20 02 de 2025
                <br />
                Etapa Actual del Desarrollo
                <br />
                FSOC
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Desarrollos;
