import axios from "axios"

const instance = axios.create({
    baseURL: "https://best-burger-56cc2.firebaseio.com/"
})

export default instance;