import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_all_usuarios = () => {
  const [usuarios, setUsuarios] = useState([]) // Etapas a mostrar
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsuarios] = await Promise.all([axios.get(`${api}/usuarios`)])
        setUsuarios(await resUsuarios.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { usuarios, loading, error }
}

export default fetch_all_usuarios
