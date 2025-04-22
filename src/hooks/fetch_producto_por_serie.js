import { useState, useEffect } from 'react'
import api from '../auth/axiosConfig'

const fetch_productos_por_serie = (serie) => {
  const [productosPorSerie, setProductosPorSerie] = useState([])
  const [errorProductosSerie, setErrorProductosSerie] = useState(null) // Manejo de errores
  const [loadingProductosSerie, setLoadingProductosSerie] = useState(true) // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosResponse = await api.get(`/producto/${serie}/getAll`)
        setProductosPorSerie(await productosResponse?.data?.productos)
      } catch (err) {
        setErrorProductosSerie(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setLoadingProductosSerie(false)
      }
    }
    fetchData()
  }, [])

  return { productosPorSerie, errorProductosSerie, loadingProductosSerie }
}

export default fetch_productos_por_serie
