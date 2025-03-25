import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchEtapaSeleccionada = () => {
  const [etapa, setEtapa] = useState()
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const etapaResponse = await axios.get(`${api}/producto/${productoId}`) // Actualiza el estado con los datos obtenidos
        setEtapa(await etapaResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error...')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { etapa, error, loading }
}

export default fetchEtapaSeleccionada
