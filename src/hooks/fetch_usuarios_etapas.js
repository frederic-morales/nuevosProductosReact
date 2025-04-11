import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_usuarios_etapas = ({ Usuario, SerieProductos }) => {
  const [usuarioProductos, setUsuariosProductos] = useState([]) // Etapas a mostrar
  const [loadingUsuarioProductos, setLoadingUsuarioProductos] = useState(true) // Estado de carga
  const [errorUsuarioProductos, setErrorUsuarioProductos] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEtapas = await axios.get(
          `${api}/usuarios/etapasAsignadas/${Usuario}/${SerieProductos}`
        )
        setUsuariosProductos(await resEtapas?.data)
      } catch (err) {
        setErrorUsuarioProductos(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setLoadingUsuarioProductos(false)
      }
    }
    fetchData()
  }, [])

  return { usuarioProductos, loadingUsuarioProductos, errorUsuarioProductos }
}

export default fetch_usuarios_etapas
