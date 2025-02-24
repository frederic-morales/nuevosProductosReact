import { NavLink } from "react-router";

function Producto() {
  const etapasEnProceso = [1, 2, 3, 4];
  const etapasAprobadas = [1, 2, 3];
  const etapasRechazadas = [1, 2, 3];

  return (
    <div className="flex flex-col items-center">
      <div className="mt-12">
        <p className="text-center text-xl font-black ">Nombre del Producto</p>
      </div>
      {/* Etapas totales */}
      <div className="flex flex-col justify-center items-center shadow-2xl mt-9 rounded-2xl h-fit w-full max-w-md md:max-w-xl">
        <div className="rounded-[20px] flex flex-col p-4 bg-white w-full">
          <h4 className="text-lg font-bold text-blue-400 py-2 text-center">
            Etapas Siguientes
          </h4>
          {etapasEnProceso.map((etapa) => (
            <div key={etapa} className="h-full w-full">
              <div className="flex flex-col md:flex-row text-center items-center justify-between w-full px-5 my-4">
                <p className="text-sm md:text-left text-navy-700 dark:text-white">
                  <b>Etapa Siguiente{etapa}</b>
                  <br /> Usuario
                  <br /> Inicio 20 de febrero de 2025
                </p>
                <NavLink to={"/Etapa"}>
                  <button
                    className="w-44 md:w-60 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold text-white mt-4"
                    data-ripple-light="true"
                  >
                    NavLink
                  </button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-9 w-full max-w-4xl">
        {/* Etapas en Proceso */}
        <div className="flex flex-col justify-center items-center shadow-2xl rounded-2xl h-fit w-fit">
          <div className="rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full p-4 bg-white undefined">
            <h4 className="text-lg font-bold text-blue-400 border-b py-2 text-center">
              Etapas En Proceso
            </h4>
            {etapasEnProceso.map((etapa) => (
              <div key={etapa} className="h-full w-full">
                <div className="mt-5 flex p-2">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm text-navy-700 dark:text-white">
                      <NavLink to={"/Etapa"}>
                        <b>Etapa en proceso {etapa}</b>
                        <br /> Inicio 20 de febrero de 2025
                        <br /> Usuario
                      </NavLink>
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 hover:bg-green-400 rounded-3xl ml-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 hover:bg-red-400 rounded-3xl"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Etapas Aprobadas */}
        <div className="flex flex-col items-center shadow-2xl rounded-2xl h-fit w-fit">
          <div className="rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full p-4 3xl:p-[18px] bg-white undefined">
            <h4 className="text-lg font-bold border-b py-2 text-center text-green-400">
              Etapas Aprobadas
            </h4>

            {etapasAprobadas.map((etapa) => (
              <div key={etapa} className="w-full">
                <div className="mt-5 flex items-center justify-center p-2">
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-navy-700">
                      <b>Etapa en proceso {etapa}</b>
                      <br /> Aprobada 20 de febrero de 2025
                      <br /> Usuario
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Etapas Rechazadas */}
        <div className="flex flex-col items-center shadow-2xl rounded-2xl h-fit w-fit">
          <div className="rounded-[20px] max-w-[300px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full p-4 3xl:p-[18px] bg-white undefined">
            <h4 className="text-lg font-bold border-b py-2 text-center text-red-400">
              Etapas Rechazadas
            </h4>

            {etapasRechazadas.map((etapa) => (
              <div key={etapa} className="w-full">
                <div className="mt-5 flex items-center justify-center p-2">
                  <div className="flex items-center justify-center">
                    <p className="text-sm text-navy-700 ">
                      <b>Etapa en proceso {etapa}</b>
                      <br /> Rechazada 20 de febrero de 2025
                      <br /> Usuario
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
