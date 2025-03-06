import Listado from "./Listado";
import { useState } from "react";

function Desarrollos() {
  //Estado 1=Aprobado, 2=Rechazado, 3=EnProceso

  const [listarDesarrollos, setListarDesarrollos] = useState<number>(3);
  const desarrollosAprobados = [
    {
      id: 1,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 1,
    },
    {
      id: 2,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 1,
    },
    {
      id: 3,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 1,
    },
    {
      id: 4,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 1,
    },
  ];
  const desarrollosRechazados = [
    {
      id: 1,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 2,
    },
    {
      id: 2,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 2,
    },
    {
      id: 3,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 2,
    },
  ];
  const desarrollosEnProceso = [
    {
      id: 5,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 3,
    },
    {
      id: 6,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 3,
    },
    {
      id: 8,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 3,
    },
    {
      id: 9,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 3,
    },
    {
      id: 10,
      nombre: "Nombre del desarrollo",
      descripcion: "Descripcion de prueba",
      estado: 3,
    },
  ];
  return (
    <>
      <h2 className="font-black text-2xl md:text-4xl mt-5 md:mt-8 lg:mt-12 tracking-tight text-center uppercase text-white drop-shadow-[1px_1px_0px_black]">
        Desarrollos Totales
      </h2>
      <div className="flex items-center justify-center mt-12 gap-2 md:gap-6">
        <button
          onClick={() => setListarDesarrollos(1)}
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit 
            border-2 border-[#42d340] shadow-sm shadow-green-500"
        >
          Desarrollos Aprobados
        </button>
        <button
          onClick={() => setListarDesarrollos(2)}
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5  font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit
          border-2 border-[#f66c79] shadow-sm shadow-[#f66c79]"
        >
          Desarrollos Rechazados
        </button>
        <button
          onClick={() => setListarDesarrollos(3)}
          className="text-center md:text-start text-xs md:text-lg cursor-pointer rounded-lg py-2 px-3 md:px-5 font-medium bg-gray-100 hover:shadow-xl hover:shadow-blue-300 w-fit
          border-2 border-[#879efc] shadow-sm shadow-[#879efc]"
        >
          Desarrollos en Proceso
        </button>
      </div>
      {/* Listado de desarrolos Aprobados, Rechazados o En Proceso*/}
      {listarDesarrollos == 1 && <Listado desarrollos={desarrollosAprobados} />}
      {listarDesarrollos == 3 && <Listado desarrollos={desarrollosEnProceso} />}
      {listarDesarrollos == 2 && (
        <Listado desarrollos={desarrollosRechazados} />
      )}
    </>
  );
}

export default Desarrollos;
