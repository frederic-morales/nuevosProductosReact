import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchAllProductos = () => {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosResponse] = await Promise.all([
          axios.get(`${api}/producto/getAll`)
        ])
        // Actualiza los estados con los datos obtenidos
        setProductos(await productosResponse.data)
        console.log(await productosResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { productos, error, loading }
}

export default fetchAllProductos
