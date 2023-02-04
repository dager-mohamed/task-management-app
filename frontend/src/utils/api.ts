import axios from 'axios'
import { ITask, IUser } from './constants'

export async function getUser(token: string){
    const res = await axios.post<IUser>(`${import.meta.env.VITE_BACKEND_URL}/user/info`,{
        token
    })
     return res
}

export async function getTasks(token: string){
    const res = await axios.post<ITask>(`${import.meta.env.VITE_BACKEND_URL}/task/info`,{
        token
    })
     return res
}