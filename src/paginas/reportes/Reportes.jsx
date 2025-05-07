import Seleccionar_Reporte from "./Seleccionar_Reporte";
import Seleccionar_Elemento from "./Seleccionar_Elemento";
import Buscar_usuarios from "../../componentes/Buscar_usuario";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import fetch_productos_por_serie from "../../hooks/fetch_producto_por_serie";
import fetch_all_etapas from "../../hooks/fetch_all_etapas";
import fetch_usuarios_grupo from "../../hooks/fetch_usuarios_grupo";

function Reportes() {
  const tiposReportes = [
    { Id: 1, Nombre: "REPORTE POR PRODUCTO" },
    { Id: 2, Nombre: "REPORTE POR ETAPA" },
    { Id: 3, Nombre: "REPORTE POR USUARIO" },
  ];

  const { serieProductos } = useAuth();

  const { productosPorSerie, loadingProductosSerie, errorProductosSerie } =
    fetch_productos_por_serie(serieProductos); // Trae los productos a mostrar
  const { allEtapas, loading, error } = fetch_all_etapas();
  const { grupoUsuarios, loadingGrupo, errorGrupo } = fetch_usuarios_grupo({
    CodigoGrupo: 35, // INVESTIGACION
  });

  const [reporteSeleccionado, setReporteSeleccionado] = useState();
  const [productoSeleccionado, setProductoSeleccionado] = useState();
  const [etapaSeleccionada, setEtapaSeleccionada] = useState();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  // console.log(reporteSeleccionado?.Nombre);
  const handleClick = () => {
    console.log(reporteSeleccionado?.Nombre);
    console.log("Generando reporte...");
  };

  if (loadingProductosSerie || loading || loadingGrupo) {
    return <>Cargando...</>;
  }
  if (errorProductosSerie || error || errorGrupo) {
    return <>Error...</>;
  }

  console.log(productoSeleccionado);
  console.log(etapaSeleccionada);
  console.log(usuarioSeleccionado);

  return (
    <>
      <div className="w-full mb-8 mt-8 md:mt-12 flex flex-col items-center">
        <p className="w-full max-w-sm md:max-w-xl font-black sm:text-center md:text-xl lg:text-3xl uppercase text-white drop-shadow-[1px_2px_0px_black]">
          Reportes
        </p>
      </div>
      <div className="w-full flex gap-4 lg:gap-12 justify-center items-center flex-wrap">
        <Seleccionar_Reporte
          reportes={tiposReportes}
          onSelect={(reporte) => {
            setReporteSeleccionado(reporte);
          }}
          hasError={!reporteSeleccionado}
        />
        {reporteSeleccionado?.Id == 1 && (
          <Seleccionar_Elemento
            data={productosPorSerie}
            onSelect={(producto) => {
              setProductoSeleccionado(producto);
            }}
            hasError={!productoSeleccionado}
            titulo={"BUSCAR PRODUCTO"}
          />
        )}
        {reporteSeleccionado?.Id == 2 && (
          <Seleccionar_Elemento
            data={allEtapas}
            onSelect={(etapa) => {
              setEtapaSeleccionada(etapa);
            }}
            hasError={!etapaSeleccionada}
            titulo={"BUSCAR ETAPA"}
          />
        )}
        {reporteSeleccionado?.Id == 3 && (
          <Buscar_usuarios
            usuarios={grupoUsuarios}
            onSelect={(usuario) => {
              setUsuarioSeleccionado(usuario);
            }} // Recibe el usuario seleccionado
            hasError={!usuarioSeleccionado}
          />
        )}
        {reporteSeleccionado?.Id && (
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
            {/* <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-2xl focus:outline-none focus:shadow-outline"
              onClick={() => {
                console.log(fechaDesde);
                console.log(fechaHasta);
              }}
            >
              Filtrar
            </button> */}
          </div>
        )}
        {reporteSeleccionado && fechaDesde && fechaHasta && (
          <div className="w-full max-w-sm flex items-center justify-center">
            <button
              onClick={handleClick}
              className="bg-h-fit p-4 rounded-xl font-semibold border-1 border-white bg-green-600 shadow-xs shadow-green-600 text-white hover:bg-green-700"
            >
              Generar Reporte
            </button>
          </div>
        )}
      </div>
      {reporteSeleccionado?.Nombre} <br />
      {etapaSeleccionada?.Nombre}
      {/* BUSCAR PRODUCTO */}
    </>
  );
}

export default Reportes;
