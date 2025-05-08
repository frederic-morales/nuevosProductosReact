import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router";
import fetch_productos_usuario from "../../hooks/reportes/fetch_productos_usuario";

const Reporte_productos_usuario = () => {
  const tablaRef = useRef();
  const params = useParams();
  const usuario = params?.usuario;
  const serie = params?.serie;

  const headerImage = "\\img\\Logo-Wellco.png";

  const { productosUsuario, loadingProdUser, errorProdUser } =
    fetch_productos_usuario(usuario, serie);

  const exportarPDF = () => {
    const input = tablaRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("informe.pdf");
    });
  };

  const setFecha = (fechaInicio) => {
    if (!fechaInicio) {
      return "En proceso";
    }
    const fecha = new Date(fechaInicio);
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    const fechaFormated = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaFormated;
  };

  if (loadingProdUser) {
    return <>Loading...</>;
  }

  if (errorProdUser) {
    return <>Error...</>;
  }
  // console.log(productosUsuario);
  return (
    <div className="w-5/6 p-8">
      <h1>Reporte</h1>
      {/* Tabla con referencia */}
      <div ref={tablaRef} className="bg-white p-2.5 border overflow-x-scroll">
        <div className="relative h-15 flex items-center justify-center">
          <img
            className="h-12 w-fit absolute top-2 left-0"
            src={headerImage}
            alt=""
          />
          <h2 className="text-center uppercase font-bold text-lg">
            Productos a cargo de {usuario}
          </h2>
        </div>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="bg-gray-200 uppercase">
              <th className="border-2 p-2">Id</th>
              <th className="border-2 p-2">Nombre</th>
              <th className="border-2 p-2">Descripcion</th>
              <th className="border-2 p-2">Fecha Inicio</th>
              <th className="border-2 p-2">Fecha Fin</th>
              <th className="border-2 p-2">Estado</th>
              <th className="border-2 p-2">Encargado</th>
            </tr>
          </thead>
          <tbody>
            {productosUsuario.map((producto, index) => (
              <tr key={index} className="border-2 uppercase font-semibold">
                <td className="p-2 border-r-2">
                  {producto?.DesarrolloProductoId}
                </td>
                <td className="p-2 border-r-2">{producto?.Nombre}</td>
                <td className="p-2 border-r-2">{producto?.Descripcion}</td>
                <td className="p-2 border-r-2">
                  {setFecha(producto?.FechaInicio)}
                </td>
                <td className="p-2 border-r-2">
                  {setFecha(producto?.FechaFin)}
                </td>
                <td className="p-2 border-r-2">{producto?.Estado}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Botón para descargar PDF */}
      <button
        onClick={exportarPDF}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Descargar Informe PDF
      </button>
    </div>
  );
};

export default Reporte_productos_usuario;
