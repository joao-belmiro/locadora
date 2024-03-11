import axios, { AxiosInstance } from "axios";


const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_OMDB_BASE_URL,
    timeout: 30000
})

export async function getTitles(t: string, type: string, y: number) {
    let filters = {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        t: t,
        y: y,
        type: type 

    }
    return http.get('/', { params:filters })
}