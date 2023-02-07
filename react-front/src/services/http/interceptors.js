import axios from "axios";
import AuthService from "../AuthService";
export const API_URL = "http://localhost:29501/api"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("token")
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, (async error => {
    if (error.response.status == 403 && error.response.data.message == "Access Denied" || error.response.status == 405) {
        const originalRequest = error.config
        const response = await axios.get(`${API_URL}/auth/refresh`).catch(() => {
            AuthService.logout((e)=>{})
            window.location = "/"
            return false
        })

        localStorage.setItem('token', response.data.jwtAccessToken)
        return $api.request(originalRequest)
    }
    return false
}))

export default $api