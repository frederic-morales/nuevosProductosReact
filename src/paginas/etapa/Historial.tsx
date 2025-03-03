function Historial() {
  const actualizaciones = [
    "actualizacion1",
    "actualizacion2",
    "actualizacion2",
  ];

  return (
    <div className={`w-[100%] sm:w-9/12 mt-4 flex flex-col gap-4`}>
      {actualizaciones.map((actualizacion) => (
        <div
          key={actualizacion}
          className="pb-5 pt-3 flex flex-col sm:flex-row gap-4 text-xs sm:text-sm bg-gray-50 px-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-300"
        >
          {/* Descripcion de la actualizacion */}
          <div className="w-full sm:w-[60%] text-justify">
            <p className="mb-2">Fecha de actualizacion 03 03 2025</p>
            <div className="max-h-20 overflow-auto pr-2 overscroll-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam praesentium, omnis ex expedita dicta animi ullam eaque
                modi. Est quas beatae ut adipisci natus harum assumenda sunt
                magnam provident neque. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Obcaecati autem architecto, magni maiores
                harum quibusdam nulla est ab voluptates dolor ullam molestias
                aspernatur aliquid nobis dolores fuga odit culpa quam? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                molestiae at delectus rem praesentium numquam molestias eligendi
                sint nemo! Quisquam quia voluptatum vel accusantium architecto
                mollitia exercitationem amet totam enim!
              </p>
            </div>
          </div>
          {/* Documento */}
          <div className="w-full sm:w-[20%] flex sm:flex-col">
            <input
              type="file"
              className="w-full h-full hidden"
              id="fileDownload"
              // onChange={handleFileChange}
            />
            <label
              className="w-full h-full flex sm:flex-col gap-2 justify-center items-center relative"
              htmlFor="fileDownload"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 sm:size-9 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <p className="text-[10px] sm:text-xs italic text-center">
                Nombre ultimo archivo...pdf
              </p>
            </label>
          </div>
          {/* Eliminar actualizacion */}
          <div className="w-full sm:w-[20%] flex sm:flex-col justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 sm:size-9 text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <p className="italic text-[10px] text-center sm:text-xs">
              Eliminar actualizacion
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Historial;
