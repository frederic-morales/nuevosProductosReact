import { NavLink } from "react-router-dom";

interface ListadoEtapasProps {
  titulo: string;
  bgColor?: string;
  etapas?: Array<number>;
}

function ListadoEtapas({ titulo, bgColor, etapas }: ListadoEtapasProps) {
  return (
    <>
      <div className="w-full flex flex-col items-center rounded-2xl h-fit">
        <h4
          className={`text-lg font-bold border-b py-2 text-center text-gray-50 md:text-xl`}
        >
          {titulo}
        </h4>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
          {etapas?.map((etapa) => (
            <NavLink to={"/Etapa/Historial"} key={etapa}>
              <div
                key={etapa}
                className={`w-full min-w-[200px] max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl ${bgColor} shadow-lg hover:shadow-cyan-200 opacity-95`}
              >
                <p className="text-xs text-navy-700 md:text-sm">
                  <b>Etapa {etapa}</b>
                  <br /> Aprobada 20 de febrero de 2025
                  <br /> Usuario Responsable
                  <br /> Proceso Responsable
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListadoEtapas;
