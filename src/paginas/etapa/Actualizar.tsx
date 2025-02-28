import { useState, ChangeEvent } from "react";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";

function Actualizar() {
  const [datosConfirmados, setDatosConfirmados] = useState<boolean | null>(
    null
  );

  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState<boolean>(false);

  const [textoConfirmacion, setTextoConfirmacion] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <div className={`grid grid-cols-4 gap-4 mt-8 w-[95%] sm:w-9/12`}>
      {/* Descripcion de la etapa */}
      <div className="col-start-1 col-end-5 sm:col-end-4 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
        <div className="flex flex-col items-center justify-center h-48 px-8 overflow-auto text-xs">
          <p className="mt-8 sm:text-lg text-md">Etapa Titulo</p>
          <p className="sm:text-sm">
            Descripcion etapa: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vitae reiciendis exercitationem voluptatem fuga
            pariatur quasi. A tenetur officiis aliquam sapiente rem et, aliquid
            dolores, error ratione fugit eius repudiandae! Eveniet.
          </p>
          <p className="mb-8 sm:text-sm">Fecha</p>
        </div>
      </div>
      {/* Subir archivos */}
      <div className="col-start-1 sm:col-start-4 col-end-5 bg-[#4094F7] hover:bg-blue-500 rounded-3xl shadow-md shadow-gray-500 text-sm h-20 sm:h-full hover:shadow-lg hover:shadow-blue-300">
        <input
          type="file"
          className="w-full h-full hidden"
          id="fileUpload"
          onChange={handleFileChange}
        />
        <label
          className="w-full h-full flex sm:flex-col justify-center items-center gap-8 sm:gap-1 text-xs relative"
          htmlFor="fileUpload"
        >
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
          <div className="text-center">
            <p className="md:text-sm">Archivos: 0</p>
            {file && <p className="overflow md:text-sm">{file.name}</p>}
          </div>
          <p className="md:text-sm text-center">
            Ultimo archivo <br />
            21 02 2025
          </p>
        </label>
      </div>
      {/* Comentarios */}
      <div className="col-start-1 col-end-5 ">
        <p className="text-center mb-5 mt-5 font-bold md:text-xl text-white">
          Comentarios
        </p>
        <div className="w-full h-60 p-8 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
          <textarea
            className="w-full h-full focus:outline-none overflow-x-hidden overflow-y-auto whitespace-normal break-words text-sm md:text-md"
            // type="text"
          />
        </div>
      </div>
      {/* Actualizar, Aprobar, Rechazar */}
      <div className="grid grid-cols-3 gap-3 col-start-1 col-end-5 h-14 rounded-3xl mt-6 text-white text-sm">
        <div className="col-start-1 col-end-2 bg-blue-500 rounded-3xl shadow-xs shadow-blue-500 flex sm:text-lg hover:bg-blue-700">
          <button
            className="w-full h-full"
            onClick={() => {
              setMostrarConfirmacion(true);
              setTextoConfirmacion("Se ha actualizado correctamente!!");
            }}
          >
            Actualizar
          </button>
        </div>
        <div className="col-start-2 col-end-3 bg-green-500 rounded-3xl shadow-xs shadow-green-500 flex sm:text-lg hover:bg-green-700">
          <button
            className="w-full h-full"
            onClick={() => {
              setMostrarConfirmacion(true);
              setTextoConfirmacion("Se ha aprobado la etapa correctamente!!");
            }}
          >
            Aprobar
          </button>
        </div>
        <div className="col-start-3 col-end-4 bg-red-500 rounded-3xl shadow-xs shadow-red-500 flex sm:text-lg hover:bg-red-700">
          <button
            className="w-full h-full"
            onClick={() => {
              setMostrarConfirmacion(true);
              setTextoConfirmacion("Se ha rechazo la etapa correctamente!!");
            }}
          >
            Rechazar
          </button>
        </div>
      </div>
      {mostrarConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de realizar esta accion?"
          handleConfirm={(value) => {
            setDatosConfirmados(value);
            setMostrarConfirmacion(false);
          }}
        />
      )}
      {datosConfirmados != null && datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y confirme la accion
          duracion={4000}
          bgColor="bg-green-300"
          redirigir="/Etapa"
          mensaje={textoConfirmacion}
        ></Alert>
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert // Cuando el usuario de click en guardar y cancele la accion
          duracion={4000}
          bgColor="bg-red-300"
          redirigir="/Etapa"
          mensaje="Se ha cancelado la acción!!"
        ></Alert>
      )}
    </div>
  );
}

export default Actualizar;
