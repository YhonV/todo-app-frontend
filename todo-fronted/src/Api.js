import axios from "axios"

const API_URL = "http://localhost:3000"

export const getTask = () => axios.get(`${API_URL}/tasks`)
export const createTask = (title) => axios.post(`${API_URL}/tasks`, { title })
export const updateTask = (id, title, done) => axios.put(`${API_URL}/tasks/${id}`, { title, done })
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`)