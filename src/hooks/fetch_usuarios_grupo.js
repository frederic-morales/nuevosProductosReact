import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_usuarios_grupo = ({ CodigoGrupo }) => {
  const [grupoUsuarios, setUsuariosGrupo] = useState([]) // Etapas a mostrar
  const [loadingGrupo, setLoadingGrupo] = useState(true) // Estado de carga
  const [errorGrupo, setErrorGrupo] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await axios.get(`${api}/usuarios/${CodigoGrupo}`)
        // console.log(await resUsuarios?.data.usuarios)
        setUsuariosGrupo(await resUsuarios?.data.usuarios)
      } catch (err) {
        setErrorGrupo(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoadingGrupo(false)
      }
    }
    fetchData()
  }, [])

  return { grupoUsuarios, loadingGrupo, errorGrupo }
}

export default fetch_usuarios_grupo
