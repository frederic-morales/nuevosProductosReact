import axios from 'axios'

const post_etapas_reasignar = async ({ DesarrolloProductoId, Etapas }) => {
  try {
    console.log('DesarrolloProductoId', DesarrolloProductoId)
    console.log('Etapas', Etapas)

    const API = import.meta.env.VITE_API_URL
    const response = await axios.post(`${API}/etapa/actualizarEstadoEtapas`, {
      DesarrolloProductoId: DesarrolloProductoId,
      Etapas: Etapas
    })
    console.log(await response.data)
    return await response.data
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_etapas_reasignar
