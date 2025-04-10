import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_usuarios_etapas = ({ Usuario }) => {
  const [usuarioEtapas, setUsuariosEtapas] = useState([]) // Etapas a mostrar
  const [loadingUsuarioEtapas, setLoadingUsuarioEtapas] = useState(true) // Estado de carga
  const [errorUsuarioEtapas, setErrorUsuarioEtapas] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEtapas = await axios.get(
          `${api}/usuarios/etapasAsignadas/${Usuario}`
        )
        setUsuariosEtapas(await resEtapas?.data)
      } catch (err) {
        setErrorUsuarioEtapas(
          err instanceof Error ? err.message : 'Ocurrió un error'
        )
      } finally {
        setLoadingUsuarioEtapas(false)
      }
    }
    fetchData()
  }, [])

  return { usuarioEtapas, loadingUsuarioEtapas, errorUsuarioEtapas }
}

export default fetch_usuarios_etapas
