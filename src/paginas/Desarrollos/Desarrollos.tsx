import DesarrolloDescripcion from "./DesarrolloDescripcion";
import { Desarrollo } from "../../interfaces/Desarrollo";
import Button from "../../componentes/Button";
import { useState } from "react";

function Desarrollos() {
  //Estado 1=Aprobado, 2=Rechazado, 3=EnProceso
  const desarrollosTotales: Desarrollo[] = [
    {
      id: 1,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 2,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 3,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 4,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 5,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 5,
      estado: 1,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 6,
      estado: 2,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 7,
      estado: 2,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 8,
      estado: 2,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 9,
      estado: 2,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 10,
      estado: 3,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 11,
      estado: 3,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 12,
      estado: 3,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 13,
      estado: 3,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
    {
      id: 14,
      estado: 3,
      nombreProducto: "Nombre del Producto - Prueba",
      descripcion: "Descripcion del producto",
      rechazos: 0,
      tiempoEstimado: 40,
      tiempoTotal: 34,
    },
  ];

  const [listarDesarrollos, setListarDesarrollos] = useState<number>(3);
  // const desarrollosAprobados = [
  //   {
  //     id: 1,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 1,
  //   },
  //   {
  //     id: 2,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 1,
  //   },
  //   {
  //     id: 3,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 1,
  //   },
  //   {
  //     id: 4,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 1,
  //   },
  // ];
  // const desarrollosRechazados = [
  //   {
  //     id: 1,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 2,
  //   },
  //   {
  //     id: 2,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 2,
  //   },
  //   {
  //     id: 3,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 2,
  //   },
  // ];
  // const desarrollosEnProceso = [
  //   {
  //     id: 5,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 3,
  //   },
  //   {
  //     id: 6,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 3,
  //   },
  //   {
  //     id: 8,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 3,
  //   },
  //   {
  //     id: 9,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 3,
  //   },
  //   {
  //     id: 10,
  //     nombre: "Nombre del desarrollo",
  //     descripcion: "Descripcion de prueba",
  //     estado: 3,
  //   },
  // ];
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
          text="Desarrollos Aprobados"
          classCSS="border-[#879efc] shadow-[#879efc]"
          setEstado={setListarDesarrollos}
          estado={3}
        ></Button>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-12 ">
        {desarrollosTotales.map((desarrollo) => {
          if (desarrollo.estado == listarDesarrollos) {
            return (
              <DesarrolloDescripcion
                desarrollo={desarrollo}
                classCSS={`${
                  desarrollo.estado == 1 &&
                  "border-3 border-[#42d340] shadow-md shadow-[#42d340]"
                } 
                ${
                  desarrollo.estado == 2 &&
                  "border-3 border-[#f66c79] border-md shadow-[#f66c79]"
                }
                ${
                  desarrollo.estado == 3 &&
                  "border-3 border-[#879efc] border-md shadow-[#879efc]"
                }`}
                // classCSS="border-3 border-[#42d340] shadow-md shadow-green-500"
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default Desarrollos;
