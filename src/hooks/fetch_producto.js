import { useState, useEffect } from 'react'
import api from '../auth/axiosConfig'

const fetchProducto = ({ productoId }) => {
  const [etapas, setEtapas] = useState()
  // const [info, setInfo] = useState()
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const etapasResponse = await api.get(`/producto/${productoId}/etapas`)
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
