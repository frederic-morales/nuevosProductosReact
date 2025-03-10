import { useState, ChangeEvent } from "react";
import Confirmacion from "../../componentes/Confirmacion";
import Alert from "../../componentes/Alert";

function Actualizar() {
  const [showConfirmacion, setShowConfirmacion] = useState<boolean>(false); //Estado que maneja si se debe de mostrar el mensaje de confirmacion
  const [showAlert, setShowAlert] = useState<boolean>(false); // Estado que maneja si se debe de mostrar la alerta o no, se setea al valor "false" despues de cada renderizacion
  const [datosConfirmados, setDatosConfirmados] = useState<boolean>(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB
  const [file, setFile] = useState<File | null>(null); // Estado que guarda el archivo subido
  const [msjConfirmacion, setMsjConfirmacion] = useState<string>(""); // Mensaje de confirmacion, cambia su estado dependiendo si es "Actualizar", "Aprobar" o "Rechazar"
  const [msjCancelacion, setMsjCancelacion] = useState<string>(""); // Mensaje de cancelacion, cambia su estado dependiendo si es "Actualizar", "Aprobar" o "Rechazar"
  const [rutaRedireccion, setRutaRedireccion] = useState<string>(""); // Ruta de confirmacion, cambia su estado dependiendo si es "Actualizar", "Aprobar" o "Rechazar"

  // funcion que permite subir el archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  //Funcion que maneja los estados de renderizacion "Confirmacion" y "Alert"
  const handleConfirmedResponse = (isConfirmed: boolean) => {
    setShowConfirmacion(false);
    setShowAlert(true);
    setDatosConfirmados(isConfirmed);
  };

  return (
    <div className={`grid grid-cols-4 gap-4 mt-4 sm:mt-8 sm:w-9/12`}>
      {/* Descripcion de la etapa */}
      <div className="h-48 flex flex-col px-6 py-4 col-start-1 col-end-5 sm:col-end-4 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
        <p className="text-base mb-2 font-bold">Nombre de la Etapa</p>
        <div className="h-[80%] flex-col overflow-auto text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
          <p className="sm:text-sm text-justify">
            Descripcion etapa: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vitae reiciendis exercitationem voluptatem fuga
            pariatur quasi. A tenetur officiis aliquam sapiente rem et, aliquid
            dolores, error ratione fugit eius repudiandae! Eveniet. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Praesentium impedit
            odio natus nemo deserunt soluta voluptatum, vero placeat eligendi
            exercitationem asperiores doloribus neque quos a facilis assumenda
            tenetur quasi. Eligendi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Commodi quam dolore necessitatibus illum sed
            itaque quasi consequuntur, rem officia similique consectetur. Cumque
            tenetur tempore ex magnam eligendi ut rerum minima.
          </p>
        </div>
        <p className="text-xs sm:text-sm mt-3 font-semibold ">
          Se inicio el 03 de marzo de 2025
          <br />
          Fecha de finalizacion estimada 05 05 2025
        </p>
      </div>
      {/* Subir archivos */}
      <div className="col-start-1 sm:col-start-4 col-end-5 bg-[#4094F7] hover:bg-blue-500 rounded-3xl shadow-md shadow-gray-500 h-20 sm:h-full hover:shadow-lg hover:shadow-blue-300 font-semibold">
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
            <p className="italic text-[10px] sm:text-xs">Archivos: 0</p>
            {file && <p className="overflow md:text-sm">{file.name}</p>}
          </div>
          <p className="text-center italic text-[10px] sm:text-xs">
            Ultimo archivo <br />
            21 02 2025
          </p>
        </label>
      </div>
      {/* Descripcion */}
      <div className="col-start-1 col-end-5 ">
        <p className="text-center mb-5 mt-5 font-bold md:text-xl text-white">
          Descripcion
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
              setShowConfirmacion(true);
              setMsjConfirmacion("Se ha actualizado la etapa correctamente!!");
              setMsjCancelacion("Se ha cancelado la actualizacion!!");
              setRutaRedireccion("/Etapa/Historial");
            }}
          >
            Actualizar
          </button>
        </div>
        <div className="col-start-2 col-end-3 bg-green-500 rounded-3xl shadow-xs shadow-green-500 flex sm:text-lg hover:bg-green-700">
          <button
            className="w-full h-full"
            onClick={() => {
              setShowConfirmacion(true);
              setMsjConfirmacion("Se ha aprobado la etapa correctamente!!");
              setMsjCancelacion("Se ha cancelado la aprobacion de la etapa!!");
              setRutaRedireccion("/Producto/Etapas");
            }}
          >
            Aprobar
          </button>
        </div>
        <div className="col-start-3 col-end-4 bg-red-500 rounded-3xl shadow-xs shadow-red-500 flex sm:text-lg hover:bg-red-700">
          <button
            className="w-full h-full"
            onClick={() => {
              setShowConfirmacion(true);
              setMsjConfirmacion("Se ha rechazado la etapa correctamente!!");
              setMsjCancelacion("Se ha cancelado el rechazo de la etapa!!");
              setRutaRedireccion("/Producto/Reasignar Etapas");
            }}
          >
            Rechazar
          </button>
        </div>
      </div>
      {showConfirmacion && ( //Al hacer click en cualquiera de los 3 botones
        <Confirmacion
          key={Date.now()}
          mensaje="Esta seguro de realizar esta accion?"
          handleConfirm={handleConfirmedResponse}
        />
      )}
      {showAlert &&
        datosConfirmados && ( // Al usuario confirmar que los datos estan correctos
          <Alert
            key={Date.now()}
            duracion={3000}
            bgColor="bg-green-300"
            mensaje={msjConfirmacion}
            handleMostrar={setShowAlert}
            redirigir={rutaRedireccion} // Ruta Nueva
          />
        )}
      {showAlert &&
        !datosConfirmados && ( // Al usuario cancelar los datos ingresados
          <Alert
            key={Date.now()}
            duracion={3000}
            bgColor="bg-red-300"
            mensaje={msjCancelacion}
            handleMostrar={setShowAlert}
          />
        )}
    </div>
  );
}

export default Actualizar;
