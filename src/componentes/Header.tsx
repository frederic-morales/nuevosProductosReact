import { Link } from "react-router-dom";
import headerImage from "C:\\Frederic\\ProductosNuevos\\ProductosNuevos\\frontend\\img\\Logo-Wellco.png";

function Header() {
  return (
    <div className="text-[12px] sm:text-base">
      <div className="w-full">
        {/* Items de arriba */}
        <div className="flex sm:justify-between w-full gap-1 sm:gap-4 ">
          {/* Usuario Logo y modulo */}
          <div className="flex gap-1 md:gap-0">
            <div className="flex cursor-pointer items-center gap-x-1 p-1 sm:p-3 bg-white rounded-lg shadow-2xl shadow-blue-300">
              <img className="h-3 sm:h-8" src={headerImage} alt="" />
              <span className="ml-1 sm:ml-2 font-semibold text-center">
                Wellco Corporation
              </span>
            </div>
            <div className="flex sm:flex-row items-center px-1 sm:ml-2 sm:p-3 sm:gap-2 bg-white rounded-lg shadow-2xl shadow-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-0 sm:size-7 invisible sm:visible"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
              <span className="text-center font-semibold ">
                Productos Nuevos
              </span>
            </div>
          </div>
          {/* Usuario y cerrar Sesion */}
          <div className="flex sm:gap-4 w-2/4 justify-end bg-none gap-1">
            <div className="flex items-center">
              <div className="flex cursor-pointer sm:w-28 max-h-14 h-full items-center justify-center rounded-md border px-1 bg-[#4094F7] text-white hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 sm:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="font-medium sm:text-base">FSOC</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex cursor-pointer items-center max-h-14 px-1 sm:w-36 rounded-md border h-full hover:bg-gray-100 hover:shadow-xl hover:shadow-blue-300 text-white hover:text-black">
                <span className="font-medium text-center w-full">
                  Cerrar Sesion
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* items de abajo */}
        <div className="mt-4 py-1 flex gap items-center justify-center">
          <div className="flex gap-x-8 w-full justify-start text-white">
            <span className="cursor-pointer rounded-sm py-1 px-2  font-medium hover:bg-gray-100 hover:text-black hover:shadow-xl hover:shadow-blue-300">
              <Link to={"home"}>Desarrollos en Proceso</Link>
            </span>
            <span className="cursor-pointer rounded-sm py-1 px-2 font-medium hover:bg-gray-100 hover:text-black hover:shadow-xl hover:shadow-blue-300">
              <Link to={"nuevoProducto"}>Iniciar Nuevo Desarrollo</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
