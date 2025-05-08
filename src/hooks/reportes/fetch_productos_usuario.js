import { useState, useEffect } from 'react'
import api from '../../auth/axiosConfig'

const fetch_productos_usuario = (usuario, serie) => {
  const [productosUsuario, setProductosUsuario] = useState([]) // Etapas a mostrar
  const [loadingProdUser, setLoadingProdUser] = useState(true) // Estado de carga
  const [errorProdUser, setErrorProdUser] = useState(null) // Manejo de errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/reportes/productosUsuario/${usuario}/${serie}`
        )
        setProductosUsuario(await response.data)
      } catch (err) {
        setErrorProdUser(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setLoadingProdUser(false)
      }
    }

    fetchData()
  }, [])

  return { productosUsuario, loadingProdUser, errorProdUser }
}

export default fetch_productos_usuario
