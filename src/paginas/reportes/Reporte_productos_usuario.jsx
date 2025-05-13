import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useParams } from "react-router";
import fetch_productos_usuario from "../../hooks/reportes/fetch_productos_usuario";

const Reporte_productos_usuario = () => {
  const tablaRef = useRef();
  const params = useParams();
  const usuario = params?.usuario;
  const serie = params?.serie;
  const headerImage = "\\img\\Logo-Wellco.png";

  //DATOS PARA EL ARCHIVO
  const { productosUsuario, loadingProdUser, errorProdUser } =
    fetch_productos_usuario(usuario, serie);

  //FUNCION PARA FORMATEAR FECHAS
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

  //ARCHIVO A DESCARGAR PDF
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
        "ID",
        "PRODUCTO",
        "SOLICITADO",
        "ASIGNADO",
        "ENTREGA DE DOSSIER",
        "OBTENCION DE REGISTRO",
        "LANZADO",
        "TIEMPO DE LANZAMIENTO(AÑOS)",
        "TIEMPO DE DESARROLLO(AÑOS)",
        "TIEMPO DE REGISTROS(AÑOS)",
        "TIEMPO 1RA FABRICACION(AÑOS)",
        "AVANCE",
        "OBSERVACIONES",
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
        fillColor: [222, 220, 218],
        textColor: [0, 0, 0],
        cellPadding: { top: 4, bottom: 4, right: 4, left: 4 },
        halign: "center",
        lineColor: "#000000",
        lineWidth: 0.5,
        fontStyle: "bold",
        fontSize: 10,
      },
      bodyStyles: {
        textColor: "#000000",
        halign: "center",
        lineColor: "#000000",
        lineWidth: 0.5,
        cellPadding: { top: 4, bottom: 4, right: 4, left: 4 },
        fontSize: 10,
      },
    });

    const blob = doc.output("blob");
    const dataUriString = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = dataUriString;
    link.download = "reporte.pdf"; // nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //ARCHIVO A DESCARGAR EXCEL
  const generarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    worksheet.mergeCells("A1", "M1");
    const tituloCelda = worksheet.getCell("A1");
    tituloCelda.value = "PRODUCTOS A CARGO DE ....";
    tituloCelda.font = { size: 16, bold: true };
    tituloCelda.alignment = { horizontal: "center", vertical: "middle" };

    //AGREGANDO LOGO
    const response = await fetch(headerImage);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    const imageId = workbook.addImage({
      buffer,
      extension: "png",
    });

    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 },
      ext: { width: 100, height: 50 },
    });

    const headers = [
      "ID",
      "PRODUCTO",
      "SOLICITADO",
      "ASIGNADO",
      "ENTREGA DE DOSSIER",
      "OBTENCION DE REGISTRO",
      "LANZADO",
      "TIEMPO DE LANZAMIENTO(AÑOS)",
      "TIEMPO DE DESARROLLO(AÑOS)",
      "TIEMPO DE REGISTROS(AÑOS)",
      "TIEMPO 1RA FABRICACION(AÑOS)",
      "AVANCE",
      "OBSERVACIONES",
    ];

    worksheet.addRow(headers);

    headers.forEach((_, index) => {
      const cell = worksheet.getRow(2).getCell(index + 1);
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getColumn(index + 1).width = 25; // ajusta ancho
    });

    // AGREGANDO LOS DATOS AL EXCEL
    productosUsuario.forEach((prod) => {
      const values = Object.values(prod);
      const row = worksheet.addRow(values);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
      });
    });

    // 💾 Exportar archivo
    const bufferExcel = await workbook.xlsx.writeBuffer();
    const blobExcel = new Blob([bufferExcel], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blobExcel, "reporte.xlsx");
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
      {/* SE MUESTRA EL ARCHIVO ANTES DE DESCARGAR */}
      <div ref={tablaRef} className="bg-white p-2.5 overflow-x-scroll">
        <div className="relative h-15 flex items-center justify-center">
          <img
            className="h-6 sm:h-12 w-fit absolute top-2 left-0"
            src={headerImage}
            alt=""
          />
          <h2 className="text-center uppercase font-bold text-sm sm:text-lg mt-6 sm:mt-0">
            Productos a cargo de... {usuario}
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
      <div className="w-full flex gap-4 flex-wrap justify-center mt-8">
        <button
          className="bg-h-fit p-4 rounded-xl font-semibold border-1 border-white bg-blue-700 shadow-xs text-white hover:bg-blue-500"
          onClick={generarPDF}
        >
          Descargar PDF
        </button>
        <button
          className="bg-h-fit p-4 rounded-xl font-semibold border-1 border-white bg-blue-700 shadow-xs text-white hover:bg-blue-500"
          onClick={generarExcel}
        >
          Descargar Excel
        </button>
      </div>
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
