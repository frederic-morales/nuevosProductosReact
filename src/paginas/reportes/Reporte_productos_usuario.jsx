import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  //ARCHIVO A DESCARGAR
  // const [pdfDataUri, setPdfDataUri] = useState(null);

  const generarPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [200, 600],
    });

    //IMAGEN
    doc.addImage(headerImage, "PNG", 10, 10, 15, 15); //imgX imgY imgWidth imgHeigth

    //TITULO
    const pageWidth = doc.internal.pageSize.getWidth(); //ANCHO DEL DOC
    const titulo = "Productos a cargo de... usuario";
    doc.setFontSize(26);
    const textWidth = doc.getTextWidth(titulo);
    const textX = (pageWidth - textWidth) / 2;
    doc.text(titulo, textX, 20); // Y = altura del texto (alineado con el logo)
    //TABLA
    const headers = [
      [
        "Id",
        "Producto",
        "Solicitado",
        "Asignado",
        "Entrega de Dossier",
        "Obtencion de Registro",
        "Lanzado",
        "Tiempo de Lanzamiento(años)",
        "Tiempo de Desarrollo(años)",
        "Tiempo de Registros(años)",
        "Tiempo 1era Fabricacion(años)",
        "Avance",
        "Observaciones",
      ],
    ];
    const datos = productosUsuario.map((prod) => Object.values(prod));
    console.log(datos);

    // const data = [[1, "PRODUCTO1", "12 05 2025", "12 05 2025"]];

    // const finalY = 0;
    autoTable(doc, {
      startY: 30,
      head: headers,
      body: datos,
      headStyles: {
        lineWidth: 1,
        fillColor: [222, 220, 218],
        textColor: [0, 0, 0],
        cellPadding: { top: 8, bottom: 8 },
        halign: "center",
        lineColor: "#000000",
        lineWidth: 0.5,
        fontStyle: "bold",
        fontSize: 13,
      },
      bodyStyles: {
        textColor: "#000000",
        halign: "center",
        lineColor: "#000000",
        lineWidth: 0.5,
        cellPadding: { top: 8, bottom: 8 },
        fontSize: 13,
      },
      // didDrawPage: (data) => {
      //   finalY = data.cursor.y;
      // },
    });

    // const alturaTabla = finalY / 20;

    // ⚙️ Obtener base64 como Data URI
    const blob = doc.output("blob");
    const dataUriString = URL.createObjectURL(blob);

    // ⚙️ setPdfDataUri(dataUriString);
    const link = document.createElement("a");
    link.href = dataUriString;
    link.download = "reporte.pdf"; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="w-full p-8">
      <h1>Reporte</h1>
      {/* Tabla con referencia */}
      <div ref={tablaRef} className="bg-white p-2.5 overflow-x-scroll">
        <div className="relative h-15 flex items-center justify-center">
          <img
            className="h-6 sm:h-12 w-fit absolute top-2 left-0"
            src={headerImage}
            alt=""
          />
          <h2 className="text-center uppercase font-bold text-sm sm:text-lg mt-6 sm:mt-0">
            Productos a cargo de {usuario}
          </h2>
        </div>
        <table className="w-full border-collapse border-2 mt-2 text-xs md:text-sm">
          <thead>
            <tr
              style={{
                backgroundColor: "#dedcda",
              }}
              className="uppercase"
            >
              <th className="border-r-2 p-2">Id</th>
              <th className="border-r-2 p-2">Producto</th>
              <th className="border-r-2 p-2">Solicitado</th>
              <th className="border-r-2 p-2">Asignado</th>
              <th className="border-r-2 p-2">Entrega de Dossier</th>
              <th className="border-r-2 p-2">Obtencion de Registro</th>
              <th className="border-r-2 p-2">Lanzado</th>
              <th className="border-r-2 p-2">Tiempo de Lanzamiento(años)</th>
              <th className="border-r-2 p-2">Tiempo de Desarrollo(años)</th>
              <th className="border-r-2 p-2">Tiempo de Registro(años)</th>
              <th className="border-r-2 p-2">Tiempo 1era fabricación(años)</th>
              <th className="border-r-2 p-2">Avance</th>
              <th className="p-2">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {productosUsuario.map((producto, index) => (
              <tr key={index} className="border-t-2 uppercase font-semibold">
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
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
                <td className="p-2 border-r-2">{producto?.Usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={generarPDF}>DescargarPDF</button>
      {/* Botón para descargar PDF */}
      {/* <button
        onClick={exportarPDF}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Descargar Informe PDF
      </button> */}
    </div>
  );
};

export default Reporte_productos_usuario;
