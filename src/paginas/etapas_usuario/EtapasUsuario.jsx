import EtapaDescripcion from "../../componentes/EtapaDescripcion";
import fetch_usuarios_etapas from "../../hooks/fetch_usuarios_etapas";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
// import { EtapaPrueba } from "../../interfaces/Etapa";
// import Button from "../../componentes/Button";

function EtapasUsuario() {
  //estados 1=Aprobada, 2=Rechazado, 3=EnProceso, 4=Pendiente
  const { user, serieProductos } = useAuth();
  const Usuario = user.usuario;
  const { usuarioProductos, loadingUsuarioProductos, errorUsuarioProductos } =
    fetch_usuarios_etapas({ Usuario: Usuario, SerieProductos: serieProductos });

  // console.log(user, grupoUsuario, SerieProducto);
  console.log(usuarioProductos);
  console.log(Usuario);
  console.log(serieProductos);

  const [busquedaProducto, setBusquedaProducto] = useState(""); // Estado para el texto de búsqueda por producto
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [fechaDesde, setFechaDesde] = useState(""); // Estado para la fecha de inicio
  const [fechaHasta, setFechaHasta] = useState(""); // Estado para la fecha de fin

  useEffect(() => {
    setProductosFiltrados(usuarioProductos);
  }, [usuarioProductos]);

  // Filtrar por nombre del producto
  const handleBusquedaProducto = (event) => {
    setBusquedaProducto(event.target.value);
    setProductosFiltrados(
      usuarioProductos.filter((producto) => {
        return producto.Nombre.toLocaleLowerCase().includes(
          event.target.value.toLocaleLowerCase()
        );
      })
    );
  };

  //Filtrar por fecha de Inicio
  const filtrarPorFecha = (fechaDe, fechaHasta) => {
    console.log(fechaDe, fechaHasta);

    setProductosFiltrados(
      usuarioProductos.filter((producto) => {
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

  if (loadingUsuarioProductos) {
    return <>Loading...</>;
  }

  if (errorUsuarioProductos) {
    return <>Errro {errorUsuarioProductos}</>;
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-12 my-12">
        {/* Filtrar Productos por nombre */}
        <div className="w-full max-w-xs flex flex-col items-center justify-start">
          <label className="text-white uppercase font-black text-lg md:text-xl lg:text-2xl mb-2 drop-shadow-[1px_1px_0px_black]">
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
      {/* {listarEtapas == 1 && ( */}
      <div className="w-full flex flex-wrap items-center justify-center gap-8 mt-8">
        {productosFiltrados?.map((producto) => (
          <div key={producto?.DesarrolloProductoId} className="flex w-full">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black uppercase drop-shadow-[1px_2px_0px_black] mb-4 text-gray-50 text-center w-full">
              {producto?.Nombre}
              <div className="w-full flex flex-wrap justify-center gap-8 mt-8">
                {producto?.etapas.map((etapa) => {
                  if (etapa?.AsignacionEstado != 2) {
                    let ruta = "";
                    if (etapa?.AsignacionEstado == 1)
                      ruta = `/Producto/${producto?.DesarrolloProductoId}/Etapas/${etapa?.EtapaId}/${etapa?.EtapasAsignadasId}/Historial`;
                    if (etapa?.AsignacionEstado == 3)
                      ruta = `/Producto/${producto?.DesarrolloProductoId}/Etapas/${etapa?.EtapaId}/${etapa?.EtapasAsignadasId}/Actualizar`;
                    if (etapa?.AsignacionEstado == null)
                      ruta = `/Producto/${producto?.DesarrolloProductoId}/Etapas/${etapa?.EtapaId}/${etapa?.EtapasAsignadasId}/Iniciar`;
                    return (
                      <EtapaDescripcion
                        key={etapa?.EtapasAsignadasId}
                        etapa={etapa}
                        link={ruta}
                        classCSS={`${
                          etapa?.AsignacionEstado == 1 && "bg-[#affdce]"
                        }
                                ${
                                  etapa?.AsignacionEstado == 3 && "bg-[#879efc]"
                                }
                                ${
                                  etapa?.AsignacionEstado == null &&
                                  "bg-[#ffa470]"
                                }`}
                      />
                    );
                  }
                })}
              </div>
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default EtapasUsuario;

//Pagina que mostrará las etapas que corresponden al usuario en sesión, se obtiene todas las etapas
//que tiene el usuario y se clasifican por "Etapas Aprobadas", "Etapas Rechazadas" y "Etapas en Proceso"
