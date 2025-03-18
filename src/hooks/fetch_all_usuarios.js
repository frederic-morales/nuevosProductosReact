import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_all_usuarios = () => {
  const [usuarios, setUsuarios] = useState([]) // Etapas a mostrar
  const [loadingUser, setLoadingUser] = useState(true) // Estado de carga
  const [errorUsers, setErrorUsers] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/usuarios`)
        setUsuarios(response.data)
      } catch (err) {
        setErrorUsers(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoadingUser(false)
      }
    }

    fetchData()
  }, [])

  return { usuarios, loadingUser, errorUsers }
}

export default fetch_all_usuarios
