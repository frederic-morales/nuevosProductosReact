import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_etapa_progreso = ({ desarrolloProductoId, etapaId }) => {
  const [etapaProgreso, setEtapaProgreso] = useState()
  const [errorProgreso, setErrorProgreso] = useState(null)
  const [loadingProgreso, setLoadingProgreso] = useState(null)

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/etapas/${desarrolloProductoId}/${etapaId}`
        )
        setEtapaProgreso(await response?.data)
      } catch (err) {
        setErrorProgreso(
          err instanceof Error ? err.message : 'Ocurrió un error...'
        )
      } finally {
        setLoadingProgreso(false)
      }
    }
    fetchData()
  }, [])

  return { etapaProgreso, errorProgreso, loadingProgreso }
}

export default fetch_etapa_progreso
