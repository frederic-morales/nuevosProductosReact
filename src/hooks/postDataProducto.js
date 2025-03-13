import { useState, useEffect } from 'react'
import axios from 'axios'

const postDataProducto = (sendData) => {
  const [response, setResponse] = useState()
  const api = 'http://10.10.1.149:3000'

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.post(`${api}/producto/create`, sendData)
        console.log(response.data)
        setResponse(response.data)
      } catch (err) {
        console.error('Error en el evento post:', err)
      }
    }

    handleSubmit()
  }, sendData)

  return { response }
}

export default postDataProducto
