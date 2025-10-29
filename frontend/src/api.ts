import axios from 'axios';

// 👇 safer fallback — works even if .env is missing
const API_BASE = import.meta.env?.VITE_API_BASE ?? 'http://localhost:5097';

export const api = axios.create({
  baseURL: API_BASE,
});



export interface TaskItem {
id: string
description: string
isCompleted: boolean
createdAt: string
}


export const fetchTasks = async (): Promise<TaskItem[]> => {
const r = await api.get('/api/tasks/')
return r.data
}


export const addTask = async (description: string) => {
const r = await api.post('/api/tasks/', { description })
return r.data
}


export const toggleTask = async (id: string) => {
const r = await api.patch(`/api/tasks/${id}/toggle`)
return r.data
}


export const deleteTask = async (id: string) => {
await api.delete(`/api/tasks/${id}`)
}