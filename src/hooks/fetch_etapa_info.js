import { useState, useEffect } from 'react'
import api from '../auth/axiosConfig'

const fetch_etapa_info = ({ EtapaId }) => {
  const [etapaInfo, setEtapaInfo] = useState([]) // Etapas a mostrar
  const [loadingEtapaInfo, setLoadingEtapaInfo] = useState(true) // Estado de carga
  const [errorEtapaInfo, setErrorEtapaInfo] = useState(null) // Manejo de errores
  // const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuariosEtapa = await api.get(`/etapaInfo/${EtapaId}`)
        setEtapaInfo(await resUsuariosEtapa?.data)
      } catch (err) {
        setErrorEtapaInfo(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setLoadingEtapaInfo(false)
      }
    }
    fetchData()
  }, [])

  return { etapaInfo, loadingEtapaInfo, errorEtapaInfo }
}

export default fetch_etapa_info
