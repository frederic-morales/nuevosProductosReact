import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_etapa_historial = ({
  desarrolloProductoId,
  etapaId,
  progresoEtapaId
}) => {
  const [etapaHistorial, setEtapaHistorial] = useState([]) // Campos traídos desde la DB
  const [loadingHistorial, setloadingHistorial] = useState(true) // Estado de carga
  const [errorHistorial, setErrorHistorial] = useState(null) // Manejo de errores

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historialResponse = await axios.get(
          `${api}/etapas/${desarrolloProductoId}/historial/${etapaId}/progreso/${progresoEtapaId}`
        )
        setEtapaHistorial(await historialResponse.data)
      } catch (err) {
        setloadingHistorial(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setErrorHistorial(false)
      }
    }

    fetchData()
  }, [])

  return { etapaHistorial, loadingHistorial, errorHistorial }
}

export default fetch_etapa_historial
