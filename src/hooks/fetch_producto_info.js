import { useState, useEffect } from 'react'
import api from '../auth/axiosConfig'

const fetch_Producto_Info = ({ productoId }) => {
  const [info, setInfo] = useState()
  const [errorInfo, setErrorInfo] = useState(null) // Manejo de errores
  const [loadingInfo, setLoadingInfo] = useState(true) // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(productoId)
        const infoResponse = await api.get(`/producto/${productoId}`)
        setInfo(await infoResponse.data)
      } catch (err) {
        setErrorInfo(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoadingInfo(false)
      }
    }
    fetchData()
  }, [])

  console.log(info)

  return { info, errorInfo, loadingInfo }
}
export default fetch_Producto_Info
