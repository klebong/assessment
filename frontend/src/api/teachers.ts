import { Teacher, TeachersResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const teachersApi = {
  async getAllTeachers(): Promise<Teacher[]> {
    const response = await fetch(`${API_BASE_URL}/teachers`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch teachers: ${response.status}`)
    }
    
    const result: TeachersResponse = await response.json()
    return result.data
  },

  async createTeacher(name: string, subject: string, email: string, contactNumber: string): Promise<Teacher> {
    const response = await fetch(`${API_BASE_URL}/teachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, subject, email, contactNumber }),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create teacher: ${response.status}`)
    }
    
    const result: { data: Teacher } = await response.json()
    return result.data
  },
}
