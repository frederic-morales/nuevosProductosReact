import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_Producto_Info = ({ productoId }) => {
  const [info, setInfo] = useState()
  const [errorInfo, setErrorInfo] = useState(null) // Manejo de errores
  const [loadingInfo, setLoadingInfo] = useState(true) // Estado de carga
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoResponse = await axios.get(`${api}/producto/${productoId}`)
        setInfo(await infoResponse.data)
      } catch (err) {
        setErrorInfo(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoadingInfo(false)
      }
    }
    fetchData()
  }, [])

  return { info, errorInfo, loadingInfo }
}
export default fetch_Producto_Info
