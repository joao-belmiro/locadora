import axios, { AxiosInstance } from "axios";


const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_VIA_CEP_BASE_URL,
    timeout: 30000
})

export async function getCep(cep:string) {
    return http.get(`/${cep}/json`)
}