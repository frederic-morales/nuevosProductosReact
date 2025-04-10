import EtapaDescripcion from "../../componentes/EtapaDescripcion";
import fetch_usuarios_etapas from "../../hooks/fetch_usuarios_etapas";
import { useAuth } from "../../auth/AuthContext";
// import { EtapaPrueba } from "../../interfaces/Etapa";
// import Button from "../../componentes/Button";

function EtapasUsuario() {
  //estados 1=Aprobada, 2=Rechazado, 3=EnProceso, 4=Pendiente
  const { user, grupoUsuario, SerieProducto } = useAuth();
  const { usuarioEtapas, loadingUsuarioEtapas, errorUsuarioEtapas } =
    fetch_usuarios_etapas({ Usuario: user });

  // console.log(user, grupoUsuario, SerieProducto);
  console.log(usuarioEtapas);

  return (
    <>
      <h1 className="text-center text-white font-bold text-3xl mt-8 uppercase drop-shadow-[1px_2px_0px_black]">
        Etapas
      </h1>
      {/* {listarEtapas == 1 && ( */}
      <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
        {usuarioEtapas?.map((etapa) => (
          <EtapaDescripcion
            key={etapa?.EtapasAsignadasId}
            etapa={etapa}
            link={`/Producto/${etapa?.DesarrolloProductoId}/Etapas/${etapa?.EtapaId}/${etapa?.EtapasAsignadasId}/Historial`}
            classCSS={`${etapa.Estado == 1 && "bg-[#affdce]"} 
                        ${etapa.Estado == 2 && "bg-red-400"}
                        ${etapa.Estado == 3 && "bg-[#879efc]"}
                        `}
          />
        ))}
      </div>
    </>
  );
}

export default EtapasUsuario;

//Pagina que mostrará las etapas que corresponden al usuario en sesión, se obtiene todas las etapas
//que tiene el usuario y se clasifican por "Etapas Aprobadas", "Etapas Rechazadas" y "Etapas en Proceso"
