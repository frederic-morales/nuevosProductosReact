import { NavLink } from "react-router";

function EtapaDescripcion({ etapa, classCSS, link }) {
  // console.log(etapa);

  const setFecha = (fechaInicio) => {
    const fecha = new Date(fechaInicio);
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    const fechaFormated = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );

    return fechaFormated;
  };

  // console.log(etapa);

  return (
    <NavLink to={link}>
      <div
        className={`w-[300px] md:w-[375px] lg:w-[390px] h-full px-4 py-6 flex rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl border-2 border-blue-200
            ${classCSS} ${
          !etapa?.PermitirInicio && "opacity-80 bg-gray-100 border-none"
        }`}
      >
        <ul className="text-xs md:text-sm text-black font-semibold uppercase flex flex-col ">
          <li className="font-black mb-2 text-sm md:text-[16px] lg:text-[18px]">
            {etapa?.EtapaId}
            {" - "}
            {etapa?.Nombre}
          </li>
          <li className="font-bold mt-2">Procesos Responsables:</li>
          {etapa?.procesosResponsables?.map((proceso) => (
            <li key={proceso?.Nombre}> {proceso?.Nombre}, </li>
          ))}
          <li className="font-bold mt-2">Usuarios Asignados:</li>
          {etapa?.usuariosAsignados?.map((usuario) => (
            <li key={usuario.Nombres}>
              {" "}
              {usuario?.Nombres} {usuario?.Apellidos},{" "}
            </li>
          ))}
          <li className="mt-2 font-bold">Tiempo total en Desarrollo:</li>
          {<li>25 meses</li>}
          {etapa?.FechaInicio && (
            <>
              <li className="mt-2 font-bold">Fecha de Inicio: </li>
              <li>{setFecha(etapa?.FechaInicio)}</li>
            </>
          )}
          <li className="font-black mt-6 text-[14px] h-full flex items-end">
            {etapa?.ProgresoEstado === 1 && "Etapa Aprobada"}
            {etapa?.ProgresoEstado === 2 && "Etapa Rechazada"}
            {etapa?.ProgresoEstado === 3 && "Etapa en Proceso"}
            {etapa?.ProgresoEstado === null &&
              etapa?.PermitirInicio &&
              "Etapa siguiente"}
            {etapa?.ProgresoEstado === null &&
              !etapa?.PermitirInicio &&
              "Etapa bloqueda"}
          </li>
        </ul>
      </div>
    </NavLink>
  );
}

export default EtapaDescripcion;
