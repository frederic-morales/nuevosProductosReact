import DesarrolloDescripcion from "./Desarrollo_descripcion";
import Button from "../../componentes/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import fetch_productos_por_serie from "../../hooks/fetch_producto_por_serie";

function Desarrollos() {
  // const [productosFiltrados, setProductosFiltrados] = useState([]);
  const { serieProductos } = useAuth(); // Trae la serie seleccionada en el login
  const [busquedaProducto, setBusquedaProducto] = useState(""); // Estado para el texto de búsqueda por producto
  const [busquedaPorResponsable, setBusquedaPorResponsable] = useState(""); // Estado para el texto de búsqueda por usuario responsable
  const [fechaDesde, setFechaDesde] = useState(""); // Estado para la fecha de inicio
  const [fechaHasta, setFechaHasta] = useState(""); // Estado para la fecha de fin
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [listarDesarrollos, setListarDesarrollos] = useState(3);
  const { productosPorSerie, loadingProductosSerie, errorProductosSerie } =
    fetch_productos_por_serie(serieProductos); // Trae los productos a mostrar

  console.log(productosPorSerie);

  useEffect(() => {
    setProductosFiltrados(productosPorSerie);
  }, [productosPorSerie]);

  // Función para manejar la búsqueda
  const handleBusquedaProducto = (event) => {
    setBusquedaProducto(event.target.value);

    setProductosFiltrados(
      productosPorSerie.filter((producto) => {
        return producto.Nombre.toLocaleLowerCase().includes(
          event.target.value.toLocaleLowerCase()
        );
      })
    );

    setFechaDesde("");
    setFechaHasta("");
  };

  const handleBusquedaPorResponsable = (event) => {
    setBusquedaPorResponsable(event.target.value);

    console.log(event.target.value);

    setProductosFiltrados(
      productosPorSerie.filter((producto) => {
        return (
          producto.Responsable.toLocaleLowerCase().includes(
            event.target.value.toLocaleLowerCase()
          ) ||
          producto.Apellidos.toLocaleLowerCase().includes(
            event.target.value.toLocaleLowerCase()
          )
        );
      })
    );

    setFechaDesde("");
    setFechaHasta("");
  };

  const filtrarPorFecha = (fechaDe, fechaHasta) => {
    console.log(fechaDe, fechaHasta);

    setProductosFiltrados(
      productosPorSerie.filter((producto) => {
        const fechaProducto = producto.FechaInicio; // Convertir la fecha ISO a objeto Date
        const fechaInicio = fechaDe ? fechaDe : null; // Convertir la fecha "de" a objeto Date
        const fechaFin = fechaHasta ? fechaHasta : null; // Convertir la fecha "hasta" a objeto Date

        console.log("FechaProducto", fechaProducto);
        console.log("Fecha Inicio", fechaInicio);
        console.log("Fecha Final", fechaFin);

        // Verificar si la fecha del producto está dentro del rango
        if (fechaInicio && fechaFin) {
          return fechaProducto >= fechaInicio && fechaProducto <= fechaFin;
        } else if (fechaInicio) {
          return fechaProducto >= fechaInicio;
        } else if (fechaFin) {
          return fechaProducto <= fechaFin;
        } else {
          return true; // Si no hay fechas seleccionadas, mostrar todos los productos
        }
      })
    );
  };

  if (loadingProductosSerie) {
    return <div>Cargando...</div>;
  }

  if (errorProductosSerie) {
    return <div>Error...</div>;
  }

  // console.log(productos, loading, error);
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
      <div className="w-full flex-col flex-wrap gap-8 md:gap-20 md:flex-row flex items-center md:justify-center justify-between mt-8 md:mt-12">
        {/* Filtrar por nombre del producto */}
        <div className="w-full max-w-xs flex flex-col items-center justify-start">
          <label className="text-white uppercase font-black text-lg md:text-xl mb-2 drop-shadow-[1px_1px_0px_black]">
            Filtrar por producto:
          </label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busquedaProducto}
            onChange={handleBusquedaProducto}
            className="max-w-xs placeholder-white block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          />{" "}
        </div>
        {/* Filtrar por responsable*/}
        <div className="w-full max-w-xs flex flex-col items-center justify-start flex-wrap">
          <label className="text-white uppercase font-black text-lg md:text-xl mb-2 drop-shadow-[1px_1px_0px_black]">
            Filtrar por responsable:
          </label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busquedaPorResponsable}
            onChange={handleBusquedaPorResponsable}
            className="max-w-xs placeholder-white block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          />{" "}
        </div>
        {/* Filtrar por fecha */}
        <div className="w-full max-w-xs flex flex-col items-center justify-start">
          <p className="text-white uppercase font-black text-lg md:text-xl mb-2 drop-shadow-[1px_1px_0px_black]">
            Filtrar por fecha
          </p>
          <label className="w-full bg-white text-center font-semibold mb-2 rounded-2xl drop-shadow-[1px_1px_0px_black]">
            De:
            <input
              type="date"
              value={fechaDesde}
              className="ml-2"
              onChange={(e) => {
                setFechaDesde(e.target.value);
              }}
            />
          </label>
          <label className="w-full max-w-xs bg-white text-center font-semibold mb-2 rounded-2xl drop-shadow-[1px_1px_0px_black]">
            Hasta:
            <input
              type="date"
              value={fechaHasta}
              className="ml-2"
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </label>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-2xl focus:outline-none focus:shadow-outline"
            onClick={() => filtrarPorFecha(fechaDesde, fechaHasta)}
          >
            Filtrar
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-5 mt-8 md:mt-12 ">
        {productosFiltrados.map((desarrollo) => {
          if (desarrollo.Estado == listarDesarrollos) {
            return (
              <DesarrolloDescripcion
                scripcion
                key={desarrollo.DesarrolloProductoId}
                desarrollo={desarrollo}
                link={
                  desarrollo.Estado == 2
                    ? `/Producto/${desarrollo.DesarrolloProductoId}/Etapas`
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
