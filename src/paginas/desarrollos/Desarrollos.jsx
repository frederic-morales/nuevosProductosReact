import DesarrolloDescripcion from "./Desarrollo_descripcion";
import Button from "../../componentes/Button";
import fetchAllProductos from "../../hooks/fetch_all_productos";
import { useState } from "react";

function Desarrollos() {
  const { productos, loading, error } = fetchAllProductos();

  // console.log(productos, loading, error);

  const [listarDesarrollos, setListarDesarrollos] = useState(3);
  return (
    <>
      <h2 className="font-black text-2xl md:text-4xl mt-5 md:mt-8 lg:mt-12 tracking-tight text-center uppercase text-white drop-shadow-[1px_1px_0px_black]">
        Desarrollos Totales
      </h2>
      <div className="flex items-center justify-center mt-12 gap-2 md:gap-6">
        <Button
          text="Desarrollos Aprobados"
          classCSS="border-[#42d340] shadow-green-500"
          setEstado={setListarDesarrollos}
          estado={1}
        ></Button>
        <Button
          text="Desarrollos Rechazados"
          classCSS="border-[#f66c79] shadow-[#f66c79]"
          setEstado={setListarDesarrollos}
          estado={2}
        ></Button>
        <Button
          text="Desarrollos En Proceso"
          classCSS="border-[#879efc] shadow-[#879efc]"
          setEstado={setListarDesarrollos}
          estado={3}
        ></Button>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-12 ">
        {productos.map((desarrollo) => {
          if (desarrollo.Estado == listarDesarrollos) {
            return (
              <DesarrolloDescripcion
                key={desarrollo.DesarrolloProductoId}
                desarrollo={desarrollo}
                link={
                  desarrollo.Estado == 2
                    ? `/Producto/${desarrollo.DesarrolloProductoId}/Reasignar Etapas`
                    : `/Producto/${desarrollo.DesarrolloProductoId}/Etapas`
                }
                classCSS={`${
                  desarrollo.Estado == 1 &&
                  "border-3 border-[#42d340] shadow-md shadow-[#42d340]"
                } 
                ${
                  desarrollo.Estado == 2 &&
                  "border-3 border-[#f66c79] border-md shadow-[#f66c79]"
                }
                ${
                  desarrollo.Estado == 3 &&
                  "border-3 border-[#879efc] border-md shadow-[#879efc]"
                }`}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default Desarrollos;
