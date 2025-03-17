// import { EtapaPrueba } from "../interfaces/Etapa";
import { NavLink } from "react-router";
import { useParams } from "react-router-dom";

// interface EtapaDescripcionProps {
//   classCSS: string;
//   etapa: EtapaPrueba;
//   link: string;
// }

function EtapaDescripcion({ etapa, classCSS, link }) {
  const params = useParams();
  const etapaAsignadaId = params.id;

  return (
    <NavLink to={link}>
      <div
        className={`w-full min-w-[300px] md:min-w-[375px] max-w-[450px] px-4 py-6 flex items-center rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95 ${classCSS}`}
      >
        <p className="text-xs md:text-sm text-black font-semibold">
          <b>Etapa {etapa.Nombre}</b>
          <br /> Fecha Inicio {etapa.FechaInicio || "000"}
          <br /> Usuario Responsable
          <br /> Etapa Pendiente
        </p>
      </div>
    </NavLink>
  );
}

export default EtapaDescripcion;
