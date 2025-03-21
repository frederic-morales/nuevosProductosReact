import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_all_usuarios = () => {
  const [usuarios, setUsuarios] = useState([]) // Etapas a mostrar
  const [loadingUsuarios, setLoadingUsuarios] = useState(true) // Estado de carga
  const [errorUsuarios, setErrorUsuario] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await axios.get(`${api}/usuarios`)
        // console.log(resUsuarios.data)
        setUsuarios(await resUsuarios.data)
      } catch (err) {
        setErrorUsuario(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoadingUsuarios(false)
      }
    }
    fetchData()
  }, [])

  return { usuarios, loadingUsuarios, errorUsuarios }
}

export default fetch_all_usuarios
