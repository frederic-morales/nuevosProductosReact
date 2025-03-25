import axios from 'axios'

const post_iniciar_etapa = async ({
  EtapaId,
  CodigoEmpleado,
  DesarrolloProductoId
}) => {
  try {
    const API = import.meta.env.VITE_API_URL
    const response = await axios.post(`${API}/etapa/iniciar`, {
      EtapaId: EtapaId,
      CodigoEmpleado: CodigoEmpleado,
      DesarrolloProductoId: DesarrolloProductoId
    })

    console.log(await response.data)
    return await response
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_iniciar_etapa
