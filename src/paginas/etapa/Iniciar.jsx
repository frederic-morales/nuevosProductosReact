import Alert from "../../componentes/Alert";
import Confirmacion from "../../componentes/Confirmacion";
import { useState } from "react";
import { Link } from "react-router";

function Iniciar() {
  const [showConfirmacion, setShowConfirmacion] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB

  const handleConfirmacion = (valor) => {
    setDatosConfirmados(valor);
    setShowConfirmacion(false);
  };

  const handleSubmit = () => {
    console.log("Inciando etapa...");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[100%] sm:w-9/12 mt-8 flex flex-col px-6 py-4 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
        <p className="text-base mb-2 font-bold">Nombre de la Etapa</p>
        <div className="flex-col text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
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
      </div>
      <div className="mt-6 flex gap-6 w-full  sm:w-9/12 items-center justify-center">
        <button
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-8 font-medium hover:shadow-xl hover:shadow-blue-300 w-fit 
              border-2 shadow-sm bg-green-300"
          onClick={() => {
            setShowConfirmacion(true);
          }}
        >
          Iniciar
        </button>
        <Link to={"/Producto/Etapas"}>
          <button
            className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-8 font-medium hover:shadow-xl hover:shadow-blue-300 w-fit 
              border-2 shadow-sm bg-red-300"
            onClick={() => {
              setShowConfirmacion(true);
            }}
          >
            Regresar
          </button>
        </Link>
      </div>
      {showConfirmacion && (
        <Confirmacion
          mensaje="Esta seguro de Iniciar esta Etapa!!"
          handleConfirm={handleConfirmacion}
          onSubmit={handleSubmit}
        />
      )}
      {datosConfirmados && (
        <Alert
          duracion={3000}
          bgColor="bg-green-300"
          mensaje="Etapa iniciada exitosamente!!"
          redirigir=""
        />
      )}
      {datosConfirmados != null && !datosConfirmados && (
        <Alert
          duracion={3000}
          bgColor="bg-red-300"
          mensaje="Inicio cancelado!!"
        />
      )}
    </div>
  );
}

export default Iniciar;
