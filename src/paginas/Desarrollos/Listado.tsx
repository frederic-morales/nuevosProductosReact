import { Link } from "react-router";

interface ListadoProps {
  desarrollos: Array<any>;
}

function Listado({ desarrollos }: ListadoProps) {
  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-12 ">
        {desarrollos?.map((desarrollo) => (
          <Link
            to={"/Producto/Etapas"}
            className="w-full min-w-[200px] max-w-[250px] md:max-w-[350px] lg:max-w-[380px]"
            key={desarrollo.id}
          >
            <div
              key={desarrollo.id}
              className={`w-full px-4 md:px-6 py-4 md:py-6 flex items-center justify-start rounded-2xl shadow-lg hover:shadow-cyan-200 hover:shadow-xl opacity-95 
                        bg-gray-50 
                        ${
                          desarrollo.estado == 1 &&
                          "border-3 border-[#42d340] shadow-md shadow-green-500"
                        }
                        ${
                          desarrollo.estado == 2 &&
                          "border-3 border-[#f66c79] shadow-md shadow-[#f66c79]"
                        }
                        ${
                          desarrollo.estado == 3 &&
                          "border-4 border-[#879efc] shadow-md shadow-[#879efc]"
                        }
                        `}
            >
              <p className="text-xs md:text-sm text-black font-semibold">
                <b>{desarrollo.nombre}</b>
                <br />
                Fecha de Inicio: <b>01 01 2025</b>
                {desarrollo.estado == 1 && (
                  <>
                    <br /> Desarrollo Aprobado
                    <br /> Fecha de Aprobacion: <b>06 03 2025</b>
                  </>
                )}
                {desarrollo.estado == 2 && (
                  <>
                    <br /> Desarrollo Rechzado
                  </>
                )}
                {desarrollo.estado == 3 && (
                  <>
                    <br /> Etapa Pendiente
                  </>
                )}
                <br /> Tiempo estimado: <b>25 meses</b>
                <br /> Tiempo total del Desarrollo: <b>20 meses</b>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Listado;
