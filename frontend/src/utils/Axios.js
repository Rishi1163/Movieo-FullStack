import axios from "axios";
import { baseUrl, summaryApi } from "../common/summaryApi";

export const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            console.log("No refreshToken found!");
            return null
        }
        const res = await Axios({
            ...summaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = res.data.data.accessToken
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log("Error refreshing token", error);
        return null
    }
}

Axios.interceptors.request.use(
     (config) => {
        const accessToken =  localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

Axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalReq = error.config
        if (error.response?.status === 401 && !originalReq.retry) {
            originalReq.retry = true

            const refreshToken = localStorage.getItem("refreshToken")
            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken)

                    if (newAccessToken) {
                        originalReq.headers.Authorization = `Bearer ${newAccessToken}`
                        return Axios(originalReq)
                    }

                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
        return Promise.reject(error)
    }
)