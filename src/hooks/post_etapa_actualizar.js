import axios from 'axios'

const post_etapa_actualizar = async ({ formData }) => {
  try {
    const API = import.meta.env.VITE_API_URL
    const response = await axios.post(
      `${API}/etapa/progreso/actualizacion`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log(await response.data)
    return await response
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_etapa_actualizar
