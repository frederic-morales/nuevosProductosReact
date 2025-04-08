import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_etapas_iniciadas_proceso_actual = ({ DesarrolloProductoId }) => {
  const [etapasEnProcesoActual, setetapasEnProcesoActual] = useState([]) // Etapas a mostrar
  const [loadingEtapasEnProceso, setloadingEtapasEnProceso] = useState(true) // Estado de carga
  const [errorEtapasEnProceso, setErrorEtapasEnProceso] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEtapas = await axios.get(
          `${api}/etapasEnProcesoActual/${DesarrolloProductoId}`
        )
        setetapasEnProcesoActual(await resEtapas.data)
      } catch (err) {
        setloadingEtapasEnProceso(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setErrorEtapasEnProceso(false)
      }
    }
    fetchData()
  }, [])

  return { etapasEnProcesoActual, loadingEtapasEnProceso, errorEtapasEnProceso }
}

export default fetch_etapas_iniciadas_proceso_actual
