import axios from 'axios'
// import fileDownload from 'js-file-download'

const descargarArchivo = async (rutaArchivo) => {
  try {
    const API = import.meta.env.VITE_API_URL
    const res = await axios.get(`${API}/etapa/historial/${rutaArchivo}`, {
      responseType: 'blob' // para recibir el archivo como binario
    })

    // fileDownload(res.data, rutaArchivo)
    console.log(res)
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', nombreArchivo) // Nombre del archivo a guardar
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (err) {
    console.error('Error al descargar archivo:', err)
  }
}

export default descargarArchivo
