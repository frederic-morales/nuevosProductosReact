// import { useState } from "react";

function Etapa() {
  return (
    <div className="flex flex-col items-center mt-16 mb-16">
      {/* Titutlo de la Etapa */}
      <div>
        <h2 className="text-2xl">Etapa 1 Producto 1</h2>
        <h4 className="text-lg font-bold py-2 text-center text-green-400">
          Etapa en Proceso
        </h4>
      </div>
      {/* Etapa Seguimiento */}
      <div className="grid grid-cols-4 gap-4 mt-8 w-[95%] sm:w-9/12">
        {/* Descripcion de la etapa */}
        <div className="col-start-1 col-end-5 sm:col-end-4 rounded-3xl shadow-3xl shadow-gray-100">
          <div className="flex flex-col items-center justify-center h-48 px-8 overflow-auto text-xs">
            <p className="mt-8 sm:text-lg text-md">Etapa Titulo</p>
            <p className="sm:text-sm">
              Descripcion etapa: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Vitae reiciendis exercitationem voluptatem fuga
              pariatur quasi. A tenetur officiis aliquam sapiente rem et,
              aliquid dolores, error ratione fugit eius repudiandae! Eveniet.
            </p>
            <p className="mb-8 sm:text-sm">Fecha</p>
          </div>
        </div>
        {/* Subir archivos */}
        <div className="col-start-1 sm:col-start-4 col-end-5 bg-blue-300 shadow-3xl shadow-gray-100 rounded-3xl text-sm h-20 sm:h-full">
          <button className="w-full h-full flex sm:flex-col justify-center items-center gap-8 sm:gap-1 text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 sm:mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="md:text-sm">Archivos: 0</p>
            <p className="md:text-sm">
              Ultimo archivo <br />
              21 02 2025
            </p>
          </button>
        </div>
        {/* Comentarios */}
        <div className="col-start-1 col-end-5 ">
          <p className="text-center mb-5 mt-5 font-black">Comentarios</p>
          <div className="w-full h-60 p-8 rounded-3xl shadow-3xl shadow-gray-100">
            <textarea
              className="w-full h-full focus:outline-none overflow-x-hidden overflow-y-auto whitespace-normal break-words text-sm md:text-md"
              // type="text"
            />
          </div>
        </div>
        {/* Actualizar, Aprobar, Rechazar */}
        <div className="grid grid-cols-3 gap-3 col-start-1 col-end-5 h-14 rounded-3xl mt-6 text-white text-sm">
          <div className="col-start-1 col-end-2 bg-blue-500 rounded-3xl flex sm:text-lg">
            <button className="w-full h-full">Actualizar</button>
          </div>
          <div className="col-start-2 col-end-3 bg-green-500 rounded-3xl flex sm:text-lg">
            <button className="w-full h-full">Aprobar</button>
          </div>
          <div className="col-start-3 col-end-4 bg-red-500 rounded-3xl flex sm:text-lg">
            <button className="w-full h-full">Rechazar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Etapa;
