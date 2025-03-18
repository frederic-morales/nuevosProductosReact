import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_all_etapas = () => {
  const [etapas, setEtapas] = useState([]) // Etapas a mostrar
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/etapa/getAll`)
        setEtapas(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { etapas, loading, error }
}

export default fetch_all_etapas
