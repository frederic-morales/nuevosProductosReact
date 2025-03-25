import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchProducto = ({ productoId }) => {
  const [etapas, setEtapas] = useState()
  // const [info, setInfo] = useState()
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [etapasResponse] = await Promise.all([
          axios.get(`${api}/producto/${productoId}/etapas`)
        ])
        setEtapas(await etapasResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { etapas, error, loading }
}
export default fetchProducto
