import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useParams } from "react-router";
import fetch_productos_usuario from "../../hooks/reportes/fetch_productos_usuario";
import fetch_all_etapas from "../../hooks/fetch_all_etapas";

const Reporte_productos_usuario = () => {
  const tablaRef = useRef();
  const params = useParams();
  const usuario = params?.usuario;
  const serie = params?.serie;
  const headerImage = "/img/Logo-Wellco.png";

  //DATOS PARA EL ARCHIVO
  const { productosUsuario, loadingProdUser, errorProdUser } =
    fetch_productos_usuario(usuario, serie);

  //TRAE TODAS LAS ETAPAS
  const { allEtapas, loading, error } = fetch_all_etapas();
  //console.log(allEtapas);
  //console.log(productosUsuario);

  //MOMBRES DE LAS ETAPAS
  const headersEtapas = allEtapas?.map((eta) => {
    return eta?.Nombre;
  });

  // console.log(headersEtapas);
  //FUNCION PARA FORMATEAR FECHAS
  const setFecha = (fechaInicio) => {
    if (!fechaInicio) {
      return "";
    }
    const fecha = new Date(fechaInicio);
    const opciones = { month: "short", year: "numeric" };
    const fechaFormated = new Intl.DateTimeFormat("es-ES", opciones).format(
      fecha
    );
    return fechaFormated;
  };

  //DE DIAS A MESES
  function diasAMeses(dias) {
    const meses = Math.ceil(dias / 30);
    return meses;
  }

  //PRODUCTOS CON ETAPAS SI NO TIENEN ALGUNA ETAPA SE INCLUYE COMO NOMBRE NO INICIADO
  //VER EN LA CONSOLA DEL NAVEGADOR PARA DEPURAR
  const etapasProducto = (etapas) => {
    const progreso = [];
    for (let index = 0; index < allEtapas?.length; index++) {
      const etapa = etapas[index];
      if (etapa) {
        progreso.push(etapa);
      } else {
        progreso.push({ Nombre: "" });
      }
    }
    return progreso;
  };
  const productosConEtapas = productosUsuario?.map((prod) => {
    const progreso = etapasProducto(prod?.progreso);
    return {
      ...prod,
      progreso,
    };
  });

  const productosConEtapasPDF = productosUsuario?.map((prod) => {
    const progreso = etapasProducto(prod?.progreso);
    const fechasInicio = progreso?.map((eta) => {
      return setFecha(eta?.FechaInicio);
    });
    return [
      prod?.DesarrolloProductoId,
      prod?.Nombre,
      setFecha(prod?.FechaInicio),
      setFecha(prod?.FechaFin),
      diasAMeses(prod?.TiempoEstimado),
      diasAMeses(prod?.TiempoTotal),
      ...fechasInicio,
    ];
  });

  // console.log(productosUsuario);
  // console.log(productosConEtapasPDF);
  // console.log(productosConEtapas);
  //ARCHIVO A DESCARGAR PDF
  const generarPDF = async () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [250, 900],
      });

      //IMAGEN
      doc.addImage(headerImage, "PNG", 10, 10, 15, 15); //imgX imgY imgWidth imgHeigth

      //TITULO
      const pageWidth = doc.internal.pageSize.getWidth(); //ANCHO DEL DOC
      const titulo = `Productos a cargo de ${usuario}`;
      doc.setFontSize(26);
      const textWidth = doc.getTextWidth(titulo);
      const textX = (pageWidth - textWidth) / 2;
      doc.text(titulo, textX, 20); // Y = altura del texto (alineado con el logo)

      autoTable(doc, {
        startY: 30,
        head: [
          [
            "Id",
            "Producto",
            "Fecha Inicio Producto",
            "FechaFin",
            "Tiempo Estimado - Meses",
            "Tiempo Total - Meses",
            ...headersEtapas,
          ],
        ],
        body: productosConEtapasPDF,
        headStyles: {
          fillColor: [222, 220, 218],
          textColor: [0, 0, 0],
          cellPadding: { top: 2, bottom: 2, right: 2, left: 2 },
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
          cellPadding: { top: 2, bottom: 2, right: 2, left: 2 },
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
    } catch (err) {
      console.log(err);
    }
  };

  //ARCHIVO A DESCARGAR EXCEL
  const generarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    worksheet.mergeCells("A1", "M1");
    const tituloCelda = worksheet.getCell("A1");
    tituloCelda.value = `Productos a cargo de ${usuario}`;
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
      ext: { width: 60, height: 60 },
    });

    const headers = [
      "Id",
      "Producto",
      "Fecha Inicio Producto",
      "Fecha Fin Producto",
      "Tiempo Estimado - Meses",
      "Tiempo Total - Meses",
      ...headersEtapas,
    ];
    worksheet.addRow(headers);

    headers.forEach((_, index) => {
      const cell = worksheet.getRow(2).getCell(index + 1);
      cell.font = { bold: true };
      cell.alignment = {
        horizontal: "center",
        wrapText: true,
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getColumn(index + 1).width = 25; // ajusta ancho
    });

    // AGREGANDO LOS DATOS AL EXCEL
    productosConEtapasPDF.forEach((prod) => {
      const values = Object.values(prod); //OBTIENE LOS VALORES DE CADA PROPIEDAD DE CADA OBJETO
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

    //CAMBIANDO EL TAMAÑO LA PRIMERA FILA
    worksheet.getRow(1).height = 50;
    // 💾 Exportar archivo
    const bufferExcel = await workbook.xlsx.writeBuffer();
    const blobExcel = new Blob([bufferExcel], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blobExcel, "reporte.xlsx");
  };

  if (loadingProdUser || loading) {
    return <>Loading...</>;
  }

  if (errorProdUser || error) {
    return <>Error...</>;
  }
  // console.log(productosUsuario);
  return (
    <div className="w-full px-4 bg-white rounded-xl">
      {/* SE MUESTRA EL ARCHIVO ANTES DE DESCARGAR */}
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
              <th className="border-r-2 p-2">Fecha Inicio Producto</th>
              <th className="border-r-2 p-2">Fecha Fin Producto</th>
              <th className="border-r-2 p-2">Tiempo Estimado - Meses</th>
              <th className="border-r-2 p-2">Tiempo total - Meses</th>
              {allEtapas?.map((etap, index) => (
                <th key={index} className="border-r-2 p-2">
                  {etap?.Nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productosConEtapas.map((producto, index) => (
              <tr key={index} className="border-t-2 uppercase">
                <td className="p-2 border-r-2 text-center">
                  {producto?.DesarrolloProductoId}
                </td>
                <td className="p-2 border-r-2 text-center">
                  {producto?.Nombre}
                </td>
                <td className="p-2 border-r-2 text-center">
                  {setFecha(producto?.FechaInicio)}
                </td>
                <td className="p-2 border-r-2 text-center">
                  {setFecha(producto?.FechaFin)}
                </td>
                <td className="p-2 border-r-2 text-center">
                  {diasAMeses(producto?.TiempoEstimado)}
                </td>
                <td className="p-2 border-r-2 text-center">
                  {diasAMeses(producto?.TiempoTotal)}
                </td>
                {producto?.progreso?.map((eta, index) => (
                  <td
                    key={index}
                    className={`p-2 border-r-2 text-center ${
                      eta.FechaInicio ? "" : ""
                    }`}
                  >
                    {eta.FechaFinal ? setFecha(eta?.FechaFinal) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table className="border-collapse border-2 mt-2 text-xs md:text-sm">
          <thead>
            <tr
              style={{
                backgroundColor: "#dedcda",
              }}
              className="uppercase"
            >
              <th>Hola</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hola2</td>
            </tr>
          </tbody>
        </table> */}
      </div>
      <div className="w-full flex gap-4 flex-wrap justify-center my-6">
        <button
          className="bg-h-fit p-4 rounded-xl font-semibold border-1 border-white bg-blue-700 shadow-xs text-white hover:bg-blue-500 hover:text-green-200"
          onClick={generarPDF}
        >
          Descargar PDF
        </button>
        <button
          className="bg-h-fit p-4 rounded-xl font-semibold border-1 border-white bg-blue-700 shadow-xs text-white hover:bg-blue-500 hover:text-green-200"
          onClick={generarExcel}
        >
          Descargar Excel
        </button>
      </div>
    </div>
  );
};

export default Reporte_productos_usuario;
