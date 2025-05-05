import Alert from "../../componentes/Alert";
import Confirmacion from "../../componentes/Confirmacion";
// import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import fetch_etapa_historial from "../../hooks/fetch_etapa_historial";
import { useParams } from "react-router";
import descargarArchivo from "../../hooks/fetch_download_file";
import post_delete_historial_etapa from "../../hooks/post_delete_historial_etapa";
import { useOutletContext } from "react-router-dom";

function Historial() {
  const params = useParams();
  const desarrolloProductoId = params.productoId;
  const etapaId = params.etapaId;

  const etapa = useOutletContext();
  const progresoEtapaId = etapa?.ProgresoEtapaId;

  const [showConfirmacion, setShowConfirmacion] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB
  // const [historial, setHistorial] = useState([]);
  const [ProEtapaHistorialId, setProEtapaHistorialId] = useState(null);
  const [rutaArchivo, setRutaArchivo] = useState(null);

  const { etapaHistorial } = fetch_etapa_historial({
    desarrolloProductoId,
    etapaId,
    progresoEtapaId,
  });

  const historial = etapaHistorial?.response;
  // console.log(etapaHistorial);

  const handleConfirmacion = (valor) => {
    setDatosConfirmados(valor);
    setShowConfirmacion(false);
  };

  const handleDownloadFile = (rutaFile) => {
    const rutaNormalizada = rutaFile.replace(/\\/g, "/");
    const partes = rutaNormalizada.split("/").filter(Boolean);
    const rutaArchivo = partes.slice(-3).join("/");
    // console.log(rutaArchivo);
    descargarArchivo(rutaArchivo);
  };

  const formatFecha = (date) => {
    const fecha = new Date(date);
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    const fechaInicio = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaInicio;
  };

  const handleDeleteHistorial = async (ProEtapaHistorialId, rutaFile) => {
    //SI EXISTE LA RUTA DEL ARCHIVO, SE MANDA A ELIMINAR TAMBIEN EL ARCHIVO
    if (rutaFile) {
      const rutaNormalizada = rutaFile.replace(/\\/g, "/");
      const partes = rutaNormalizada.split("/").filter(Boolean);
      const nombreProducto = partes.slice(-3, -2).join("/");
      const nombreEtapa = partes.slice(-2, -1).join("/");
      const archivo = partes.slice(-1).join("/");

      const response = await post_delete_historial_etapa({
        ProEtapaHistorialId,
        nombreProducto,
        nombreEtapa,
        archivo,
      });
      console.log(response);
    }
    // SI NO EXISTE LA RUTA DEL ARCHIVO, SOLO SE MANDA A ELIMINAR EL HISTORIAL
    else {
      const response = await post_delete_historial_etapa({
        ProEtapaHistorialId,
      });
      console.log(response);
    }
    console.log("Eliminando historial de la etapa...");
  };

  // console.log(historial);
  return (
    <>
      <div
        className={`mt-4 sm:mt-8 flex flex-col gap-6 sm:gap-8 sm:max-w-[850px]`}
      >
        {historial &&
          historial?.map((actualizacion) => (
            <div
              key={actualizacion?.ProEtapaHistorialId}
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
                  Fecha{" "}
                  {actualizacion?.FechaActualizacion && (
                    <>{formatFecha(actualizacion?.FechaActualizacion)}</>
                  )}
                  <br />
                  {actualizacion?.Descripcion}
                  <br /> {actualizacion?.Usuario}
                </p>
                <div className="max-h-24 sm:min-w-[350px] lg:min-w-[400px] overflow-auto pr-2 overscroll-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
                  <p>
                    <br />
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-[40%] flex gap-4 font-semibold ">
                {/* Documento */}
                <a
                  href={actualizacion?.rutaArchivo}
                  className="w-[50%] flex sm:flex-col bg-[#affdce] p-4 rounded-2xl shadow-xl hover:shadow-green-300"
                  onClick={() => {
                    if (actualizacion?.RutaDoc) {
                      handleDownloadFile(actualizacion?.RutaDoc);
                    }
                  }}
                >
                  <label
                    className="w-full h-full flex sm:flex-col gap-2 justify-center items-center relative overflow-hidden"
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
                    <p className="text-[10px] sm:text-xs italic max-w-16 flex flex-wrap">
                      {actualizacion?.RutaDoc && (
                        <>{actualizacion?.RutaDoc.split("\\").pop()}</>
                      )}
                    </p>
                  </label>
                </a>
                {/* Eliminar actualizacion */}
                <div
                  className="w-[50%] flex sm:flex-col justify-center items-center gap-2 bg-[#f66c79] p-4 rounded-2xl shadow-xl hover:shadow-red-300"
                  onClick={() => {
                    setShowConfirmacion(true);
                    setProEtapaHistorialId(actualizacion?.ProEtapaHistorialId);
                    setRutaArchivo(actualizacion?.RutaDoc);
                  }}
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
          onSubmit={() => {
            handleDeleteHistorial(ProEtapaHistorialId, rutaArchivo);
            window.location.reload();
          }}
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
