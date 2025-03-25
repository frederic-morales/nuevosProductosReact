import Alert from "../../componentes/Alert";
import { useOutletContext } from "react-router-dom";
import Confirmacion from "../../componentes/Confirmacion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import post_iniciar_etapa from "../../hooks/post_etapa_iniciar";

function Iniciar() {
  const etapa = useOutletContext();

  const [showConfirmacion, setShowConfirmacion] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB
  const [etapaInfo, setEtapaInfo] = useState({});

  const handleConfirmacion = (valor) => {
    setDatosConfirmados(valor);
    setShowConfirmacion(false);
  };

  const iniciarEtapa = async () => {
    const response = await post_iniciar_etapa({
      EtapaId: etapaInfo.EtapaId,
      CodigoEmpleado: 826,
      DesarrolloProductoId: etapaInfo.DesarrolloProducto,
    });

    console.log({
      EtapaId: etapaInfo.EtapaId,
      CodigoEmpleado: 826,
      DesarrolloProductoId: etapaInfo.DesarrolloProducto,
    });
    console.log(response);
  };

  useEffect(() => {
    if (etapa) {
      setEtapaInfo(etapa.infoEtapa[0]);
    }
  });

  console.log(etapaInfo);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[100%] sm:w-9/12 mt-8 flex flex-col px-6 py-4 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
        <p className="text-base mb-2 font-bold">Nombre de la Etapa</p>
        <div className="flex-col text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
          <p className="sm:text-sm text-justify ">
            Descripcion etapa: Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vitae reiciendis exercitationem voluptatem fuga
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
        <Link to={"/"}>
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
          onSubmit={iniciarEtapa}
        />
      )}
      {datosConfirmados && (
        <Alert
          duracion={3000}
          bgColor="bg-green-300"
          mensaje="Etapa iniciada exitosamente!!"
          redirigir="/"
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
