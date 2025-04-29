import { NavLink } from "react-router";

function DesarrolloDescripcion({ classCSS, desarrollo, link }) {
  // console.log(desarrollo);
  const opciones = { day: "numeric", month: "long", year: "numeric" };
  const fechaIn = new Date(desarrollo?.FechaInicio);
  const fechaInicio = new Intl.DateTimeFormat("es-ES", opciones).format(
    fechaIn
  );
  const fechaFin = new Date(desarrollo?.FechaInicio);
  const fechaFinal = new Intl.DateTimeFormat("es-ES", opciones).format(
    fechaFin
  );
  // Formatear en español

  return (
    <NavLink to={link} className="w-full min-w-[200px] max-w-[400px]">
      <div
        className={`w-full px-4 md:px-6 py-4 md:py-6 gap-2 rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow opacity-95 bg-gray-50 ${classCSS}`}
      >
        <ul className="text-xs md:text-sm text-black font-semibold uppercase flex flex-col">
          <li className="font-black mb-2 text-sm md:text-[16px]">
            {desarrollo.Nombre}
          </li>
          <li className="font-bold">Responsables:</li>
          <li>
            {desarrollo.Responsable} {desarrollo.Apellidos}
          </li>
          <li className="mt-2 font-bold">Fecha de Inicio: </li>
          {desarrollo?.FechaInicio ? (
            <li>{fechaInicio}</li>
          ) : (
            <li>No iniciado</li>
          )}
          {(desarrollo.Estado === 1 || desarrollo.Estado === 2) && (
            <>
              <li className="mt-2 font-bold">{`Fecha final:`}</li>
              <li>{`${fechaFinal}`}</li>
            </>
          )}
          <li className="mt-2 font-bold">Tiempo total en Desarrollo:</li>
          {<li>25 meses</li>}
          <li className="mt-2 ">
            <b className="font-bold"> Serie:</b>
            {desarrollo.serie == "F" ? " Farma" : " VET"}
          </li>
          <li className="font-black mt-2 text-[14px] h-full flex items-end">
            {desarrollo.Estado === 1 && "Desarrollo Aprobado"}
            {desarrollo.Estado === 2 && "Desarrollo Rechazado"}
            {desarrollo.Estado === 3 && "Desarrollo en Proceso"}
          </li>
        </ul>
      </div>
    </NavLink>
  );
}

export default DesarrolloDescripcion;
