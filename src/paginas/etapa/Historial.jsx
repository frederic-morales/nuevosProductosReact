import Alert from "../../componentes/Alert";
import Confirmacion from "../../componentes/Confirmacion";
import { useState } from "react";

function Historial() {
  const [showConfirmacion, setShowConfirmacion] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB

  const actualizaciones = [
    {
      id: 1,
      descripcion: "Aprobacion",
      estado: 1,
    },
    {
      id: 1,
      descripcion: "Rechazo",
      estado: 3,
    },
    {
      id: 2,
      descripcion: "Actualizacion",
      estado: 2,
    },
    {
      id: 3,
      descripcion: "Actualizacion",
      estado: 2,
    },
  ];

  const handleConfirmacion = (valor) => {
    setDatosConfirmados(valor);
    setShowConfirmacion(false);
  };

  return (
    <>
      <div
        className={`w-[100%] sm:w-9/12 mt-4 sm:mt-8 flex flex-col gap-6 sm:gap-8`}
      >
        {actualizaciones.map((actualizacion) => (
          <div
            key={actualizacion.id}
            className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm rounded-2xl"
          >
            {/* Descripcion de la actualizacion */}
            <div
              className={`h-fit w-full sm:w-[60%] text-justify py-5 px-4 rounded-2xl bg-gray-50 opacity-95
                ${
                  actualizacion.estado == 1 &&
                  "border-4 border-[#42d340] shadow-md shadow-green-300"
                }
                ${
                  actualizacion.estado == 3 &&
                  "border-4 border-[#f66c79] shadow-md shadow-[#f66c79]"
                }`}
            >
              <p className="mb-2 font-semibold">
                Fecha de {actualizacion.descripcion}
                <br /> Fecha 05 03 2025
                <br /> Usuario FSOC
              </p>
              <div className="max-h-24 overflow-auto pr-2 overscroll-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quisquam praesentium, omnis ex expedita dicta animi ullam
                  eaque modi. Est quas beatae ut adipisci natus harum assumenda
                  sunt magnam provident neque. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Obcaecati autem architecto,
                  magni maiores harum quibusdam nulla est ab voluptates dolor
                  ullam molestias aspernatur aliquid nobis dolores fuga odit
                  culpa quam? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ipsa molestiae at delectus rem praesentium numquam
                  molestias eligendi sint nemo! Quisquam quia voluptatum vel
                  accusantium architecto mollitia exercitationem amet totam
                  enim! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ea soluta doloribus nobis aut aliquid. Accusamus iusto vel
                  aperiam nesciunt labore modi? Pariatur, explicabo iusto. Iure
                  quibusdam similique error dolorem facere.
                  <br />
                </p>
              </div>
            </div>
            <div className="w-full sm:w-[40%] flex gap-4 font-semibold">
              {/* Documento */}
              <a
                download="algo"
                href="descarga.pdf"
                className="w-[50%] flex sm:flex-col bg-[#affdce] p-4 rounded-2xl shadow-xl hover:shadow-green-300"
              >
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
                    className="size-7 sm:size-9 "
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
              </a>
              {/* Eliminar actualizacion */}
              <div
                className="w-[50%] flex sm:flex-col justify-center items-center gap-2 bg-[#f66c79] p-4 rounded-2xl shadow-xl hover:shadow-red-300"
                onClick={() => setShowConfirmacion(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7 sm:size-9 "
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
          </div>
        ))}
      </div>
      {/* //Mensaje de confirmacion antes de eliminar */}
      {showConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de elimninar esta actualización!!"
          handleConfirm={handleConfirmacion}
        />
      )}
      {datosConfirmados && (
        <Alert
          duracion={3000}
          bgColor="bg-green-300"
          mensaje="Actualizacion elimanda!!"
        />
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert
          duracion={3000}
          bgColor="bg-red-300"
          mensaje="Eliminacion cancelada!!"
        />
      )}
    </>
  );
}

export default Historial;
