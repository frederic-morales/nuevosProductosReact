import axios from 'axios'

const post_etapa_actualizar = async ({
  ProgresoEtapaId,
  Estado,
  RutaDoc,
  Descripcion,
  EstadoDescripcion
}) => {
  try {
    const API = import.meta.env.VITE_API_URL
    const response = await axios.post(`${API}/etapa/progreso/actualizacion`, {
      ProgresoEtapaId: ProgresoEtapaId,
      Estado: Estado,
      RutaDoc: RutaDoc,
      Descripcion: Descripcion,
      EstadoDescripcion: EstadoDescripcion
    })

    console.log(await response.data)
    return await response
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_etapa_actualizar
