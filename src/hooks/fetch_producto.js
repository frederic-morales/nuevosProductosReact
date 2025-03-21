import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchProducto = ({ productoId }) => {
  const [etapas, setEtapas] = useState()
  const [info, setInfo] = useState()
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoResponse, etapasResponse] = await Promise.all([
          axios.get(`${api}/producto/${productoId}`),
          axios.get(`${api}/producto/${productoId}/etapas`)
        ])
        // Actualiza los estados con los datos obtenidos
        // console.log(await infoResponse.data)
        setInfo(await infoResponse.data)
        setEtapas(await etapasResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { info, etapas, error, loading }
}
export default fetchProducto
