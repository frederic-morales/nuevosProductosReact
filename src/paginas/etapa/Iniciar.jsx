import Alert from "../../componentes/Alert";
import { useOutletContext } from "react-router-dom";
import Confirmacion from "../../componentes/Confirmacion";
import { useState } from "react";
import post_iniciar_etapa from "../../hooks/post_etapa_iniciar";
import { useNavigate } from "react-router";
//use auth
import { useAuth } from "../../auth/AuthContext";

function Iniciar() {
  const { user } = useAuth();
  const infoEtapa = useOutletContext();
  const etapa = infoEtapa?.infoEtapa;
  const navigate = useNavigate();

  const [showConfirmacion, setShowConfirmacion] = useState();
  const [datosConfirmados, setDatosConfirmados] = useState(); // Estado que guarda la eleccion del usuario "si" o "no" - Servira para enviar los datos a la DB

  const handleConfirmacion = (valor) => {
    setDatosConfirmados(valor);
    setShowConfirmacion(false);
  };

  const iniciarEtapa = async () => {
    await post_iniciar_etapa({
      EtapaId: etapa?.EtapaId,
      Usuario: user?.usuario,
      DesarrolloProductoId: etapa?.DesarrolloProductoId,
    });
  };

  // console.log(etapa?.usuariosAsignados);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-sm md:text-base text-start m-1 md:mr-4 cursor-pointer rounded-lg py-1 px-3 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit">
        Iniciar Etapa
      </h1>
      <div className="w-[100%] sm:min-w-[450px] lg:min-w-xl mt-8 flex flex-col px-6 py-4 rounded-3xl shadow-md shadow-gray-500 bg-gray-100 opacity-95 hover:shadow-lg hover:shadow-blue-300">
        <p className="text-base mb-2 font-bold">{etapa?.NombreEtapa}</p>
        <div className="flex-col text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300">
          <p className="sm:text-sm text-justify ">
            Descripcion {etapa?.Descripcion}
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-6 w-full sm:w-9/12 items-center justify-center">
        <button
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-8 font-medium hover:shadow-xl hover:shadow-blue-300 w-fit 
              border-2 shadow-sm bg-green-300"
          onClick={() => {
            setShowConfirmacion(true);
          }}
        >
          Iniciar
        </button>
        {/* <Link to={"/"}> */}
        <button
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-8 font-medium hover:shadow-xl hover:shadow-blue-300 w-fit 
              border-2 shadow-sm bg-red-300"
          onClick={() => {
            navigate(-1);
          }}
        >
          Regresar
        </button>
        {/* </Link> */}
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
          redirigir="/Producto/All"
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
