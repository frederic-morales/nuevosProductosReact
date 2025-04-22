import { useState, useEffect } from 'react'
// import axios from 'axios'
import api from '../auth/axiosConfig'

const fetch_all_etapas = () => {
  const [allEtapas, setAllEtapas] = useState([]) // Etapas a mostrar
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Manejo de errores

  // const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`${api}/etapa/getAll`)
        const response = await api.get(`/etapa/getAll`)
        setAllEtapas(await response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { allEtapas, loading, error }
}

export default fetch_all_etapas
