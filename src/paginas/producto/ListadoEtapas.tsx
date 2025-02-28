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
        <h4 className={`text-lg font-bold border-b py-2 text-center`}>
          {titulo}
        </h4>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 bg-white mt-8 text-xs md:text-sm">
          {etapas?.map((etapa) => (
            <NavLink to={"/Etapa"} key={etapa}>
              <div
                key={etapa}
                className={`w-full max-w-[250px] px-4 py-6 flex items-center justify-center rounded-2xl ${bgColor} shadow-lg hover:shadow-cyan-200`}
              >
                <p className="text-sm text-navy-700">
                  <b>Etapa {etapa}</b>
                  <br /> Aprobada 20 de febrero de 2025
                  <br /> Usuario
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
