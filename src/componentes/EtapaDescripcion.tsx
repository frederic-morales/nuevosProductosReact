import { Etapa } from "../interfaces/Etapa";
import { NavLink } from "react-router";

interface EtapaDescripcionProps {
  classCSS: string;
  etapa: Etapa;
  link: string;
}

function EtapaDescripcion({ etapa, classCSS, link }: EtapaDescripcionProps) {
  return (
    <NavLink to={link}>
      <div
        className={`w-full min-w-[200px] max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95 ${classCSS}`}
      >
        <p className="text-xs md:text-sm text-black font-semibold">
          <b>Etapa {etapa.nombre}</b>
          <br /> Etapa Aprobada
          <br /> Usuario Responsable
          <br /> Etapa Pendiente
        </p>
      </div>
    </NavLink>
  );
}

export default EtapaDescripcion;
