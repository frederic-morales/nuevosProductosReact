import axios from 'axios'
import fileDownload from 'js-file-download'

const descargarArchivo = async (rutaArchivo) => {
  try {
    const API = import.meta.env.VITE_API_URL
    const res = await axios.get(`${API}/etapa/historial/${rutaArchivo}`, {
      responseType: 'blob' // para recibir el archivo como binario
    })
    fileDownload(res.data, rutaArchivo)
  } catch (err) {
    console.error('Error al descargar archivo:', err)
  }
}

export default descargarArchivo
