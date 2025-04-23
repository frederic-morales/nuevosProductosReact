// import axios from 'axios'
import api from '../auth/axiosConfig'

const post_iniciar_etapa = async ({
  EtapaId,
  Usuario,
  DesarrolloProductoId
}) => {
  try {
    const response = await api.post(`/etapa/iniciar`, {
      EtapaId: EtapaId,
      Usuario: Usuario,
      DesarrolloProductoId: DesarrolloProductoId
    })
    // console.log(await response.data)
    return await response
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_iniciar_etapa
