import { useState, useEffect } from 'react'
// import axios from 'axios'
import api from '../auth/axiosConfig'

const fetchAllProductos = () => {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null) // Manejo de errores
  const [loading, setLoading] = useState(true) // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await api.get('/producto/getAll')
        setProductos(await productosResponse.data)
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
