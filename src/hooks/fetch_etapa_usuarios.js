import { useState, useEffect } from 'react'
import axios from 'axios'

const fetch_etapa_usuarios = ({ EtapaId }) => {
  const [usuariosEtapa, setUsuariosEtapa] = useState([]) // Etapas a mostrar
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Manejo de errores
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resUsuariosEtapa] = await Promise.all([
          axios.get(`${api}/etapa/${EtapaId}/usuarios`)
        ])
        setUsuariosEtapa(await resUsuariosEtapa.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { usuariosEtapa, loading, error }
}

export default fetch_etapa_usuarios
