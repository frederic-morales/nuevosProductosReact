import DesarrolloDescripcion from "./Desarrollo_descripcion";
import Button from "../../componentes/Button";
import fetchAllProductos from "../../hooks/fetch_all_productos";
import { useState } from "react";

function Desarrollos() {
  // const [productosFiltrados, setProductosFiltrados] = useState([]);
  const { productos, loading, error } = fetchAllProductos();
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda

  // Función para manejar la búsqueda
  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  // Filtrar productos según la búsqueda
  const productosFiltrados = productos.filter((producto) => {
    return producto.Nombre.toLocaleLowerCase().includes(
      busqueda.toLocaleLowerCase()
    );
  });

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
      <div className="w-full flex-col gap-8 md:gap-20 md:flex-row flex items-center md:justify-center justify-between mt-8 md:mt-12">
        {/* Filtrar por nombre */}
        <div className="w-full max-w-xs flex flex-col items-center justify-start">
          <label className="text-white uppercase font-bold text-lg md:text-xl mb-2 drop-shadow-[1px_1px_0px_black]">
            Buscar por nombre:
          </label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={handleBusqueda}
            className="max-w-xs placeholder-white block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          />{" "}
        </div>
        {/* Filtrar por fecha */}
        <div className="w-full max-w-xs flex flex-col items-center justify-start">
          <label className="w-full bg-white uppercase text-center font-semibold mb-2 drop-shadow-[1px_1px_0px_black]">
            De:
            <input
              type="date"
              // value={fechaDe}
              // onChange={handleFechaDeChange}
            />
          </label>
          <label className="w-full max-w-xs bg-white text-center uppercase font-semibold mb-2 drop-shadow-[1px_1px_0px_black]">
            Hasta:
            <input
              type="date"
              // value={fechaHasta}
              // onChange={handleFechaHastaChange}
            />
          </label>
          <button
          //  onClick={filtrarPorFecha}
          >
            Filtrar
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-12 ">
        {productosFiltrados.map((desarrollo) => {
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
