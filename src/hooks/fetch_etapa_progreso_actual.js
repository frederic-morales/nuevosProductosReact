import { useState, useEffect } from 'react'
// import axios from 'axios'
import api from '../auth/axiosConfig'

const fetch_etapa_progreso_actual = ({
  desarrolloProductoId,
  etapaId,
  etapaAsignadaId
}) => {
  const [etapaProgresoActual, setEtapaProgresoActual] = useState()
  const [errorProgresoActual, setErrorProgresoActual] = useState(null)
  const [loadingProgresoActual, setLoadingProgresoActual] = useState(null)
  // const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `${api}/etapas/progresoActual/${desarrolloProductoId}/${etapaId}/asignacion/${etapaAsignadaId}`
        // )
        const response = await api.get(
          `/etapas/progresoActual/${desarrolloProductoId}/${etapaId}/asignacion/${etapaAsignadaId}`
        )
        setEtapaProgresoActual(await response?.data)
      } catch (err) {
        setErrorProgresoActual(
          err instanceof Error ? err.message : 'Ocurrió un error...'
        )
      } finally {
        setLoadingProgresoActual(false)
      }
    }
    fetchData()
  }, [])

  return { etapaProgresoActual, errorProgresoActual, loadingProgresoActual }
}

export default fetch_etapa_progreso_actual
