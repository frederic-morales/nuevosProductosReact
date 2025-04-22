import { useState, useEffect } from 'react'
import api from '../auth/axiosConfig'

const fetch_etapa_progreso = ({ desarrolloProductoId, etapaId }) => {
  const [etapaProgreso, setEtapaProgreso] = useState()
  const [errorProgreso, setErrorProgreso] = useState(null)
  const [loadingProgreso, setLoadingProgreso] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/etapas/${desarrolloProductoId}/${etapaId}`
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
