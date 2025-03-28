import axios from 'axios'

const post_verificar_usuario = async ({ Usuario, Password }) => {
  try {
    // console.log(Usuario, Password)
    const API = import.meta.env.VITE_API_URL
    const response = await axios.post(`${API}/usuarios/verificacion`, {
      Usuario: Usuario,
      Password: Password
    })

    console.log(await response.data)
    return await response.data
  } catch (err) {
    console.log('Error al iniciar la etapa...', err)
    alert(`Credenciales incorrectas`)
    return null
  }
}

export default post_verificar_usuario
