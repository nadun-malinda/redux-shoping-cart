import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-redux-http-5e815-default-rtdb.firebaseio.com'
})

export default instance