import { useState, useEffect } from 'react'
// import axios from 'axios'
import api from '../auth/axiosConfig'

const fetchDataProductos = () => {
  const [campos, setCampos] = useState([]) // Campos traídos desde la DB
  const [loadingCampos, setloadingCampos] = useState(true) // Estado de carga
  const [errorCampos, seterrorCampos] = useState(null) // Manejo de errores

  // const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const camposResponse = await axios.get(`${api}/producto/getColumns`)
        const camposResponse = await api.get(`/producto/getColumns`)
        setCampos(await camposResponse.data)
      } catch (err) {
        seterrorCampos(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setloadingCampos(false)
      }
    }

    fetchData()
  }, [])

  return { campos, loadingCampos, errorCampos }
}

export default fetchDataProductos
