import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchDataProducto = () => {
  const [etapas, setEtapas] = useState([]) // Etapas a mostrar
  const [campos, setCampos] = useState([]) // Campos traídos desde la DB
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Manejo de errores

  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza las dos peticiones en paralelo
        const [etapasResponse, camposResponse] = await Promise.all([
          axios.get(`${api}/etapa/getAll`),
          axios.get(`${api}/producto/getColumns`)
        ])
        // Actualiza los estados con los datos obtenidos
        setEtapas(await etapasResponse.data)
        setCampos(await camposResponse.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { etapas, campos, loading, error }
}

export default fetchDataProducto
