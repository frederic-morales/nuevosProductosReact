import { NavLink } from "react-router";
import { Desarrollo } from "../../interfaces/Desarrollo";

interface DesarrolloDescripcionProps {
  classCSS: string;
  desarrollo: Desarrollo;
}

function DesarrolloDescripcion({
  classCSS,
  desarrollo,
}: DesarrolloDescripcionProps) {
  return (
    <NavLink
      to={"/Producto/Etapas"}
      className="w-full min-w-[200px] max-w-[250px] md:max-w-[350px] lg:max-w-[380px]"
    >
      <div
        className={`w-full px-4 md:px-6 py-4 md:py-6 flex items-center justify-start rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95 bg-gray-50 ${classCSS}`}
      >
        <p className="text-xs md:text-sm text-black font-semibold">
          <b>{desarrollo.nombreProducto}</b>
          <br />
          Fecha de Inicio: <b>01 01 2025</b>
          <br /> Desarrollo Aprobado
          <br /> Fecha de Aprobacion: <b>06 03 2025</b>
          <br /> Desarrollo Rechzado
          <br /> Etapa Pendiente
          <br /> Tiempo estimado: <b>25 meses</b>
          <br /> Tiempo total del Desarrollo: <b>20 meses</b>
        </p>
      </div>
    </NavLink>
  );
}

export default DesarrolloDescripcion;
