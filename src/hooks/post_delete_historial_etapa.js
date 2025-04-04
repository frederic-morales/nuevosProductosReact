import axios from 'axios'

const post_delete_historial_etapa = async (ProEtapaHistorialId) => {
  try {
    // console.log(Usuario, Password)
    const API = import.meta.env.VITE_API_URL
    const response = await axios.delete(`${API}/etapa/historial`, {
      data: {
        ProEtapaHistorialId: ProEtapaHistorialId
      }
    })

    // console.log(await response.data)
    return await response.data
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    alert(`Credenciales incorrectas`)
    return null
  }
}

export default post_delete_historial_etapa
