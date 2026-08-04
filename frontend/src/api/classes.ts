import { Class, ClassesResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const classesApi = {
  async getAllClasses(): Promise<Class[]> {
    const response = await fetch(`${API_BASE_URL}/classes`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch classes: ${response.status}`)
    }
    
    const result: ClassesResponse = await response.json()
    return result.data
  },

  async createClass(level: string, name: string, teacherEmail: string): Promise<Class> {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level, name, teacherEmail }),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create class: ${response.status}`)
    }
    
    const result: { data: Class } = await response.json()
    return result.data
  },
}
