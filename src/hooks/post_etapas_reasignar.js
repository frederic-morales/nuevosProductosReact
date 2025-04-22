// import axios from 'axios'
import api from '../auth/axiosConfig'

const post_etapas_reasignar = async ({
  DesarrolloProductoId,
  Etapas,
  EtapasEnProcesoActual,
  Correlativo
}) => {
  try {
    // const API = import.meta.env.VITE_API_URL
    // const response = await axios.post(`${API}/etapa/reasignarEtapas`, {
    //   DesarrolloProductoId: DesarrolloProductoId,
    //   Etapas: Etapas,
    //   Correlativo: Correlativo,
    //   EtapasEnProcesoActual: EtapasEnProcesoActual
    // })
    const response = await api.post(`/etapa/reasignarEtapas`, {
      DesarrolloProductoId: DesarrolloProductoId,
      Etapas: Etapas,
      Correlativo: Correlativo,
      EtapasEnProcesoActual: EtapasEnProcesoActual
    })
    console.log(await response.data)
    return await response.data
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    return null
  }
}

export default post_etapas_reasignar
