import { useState, useEffect } from 'react'
import { Teacher } from '../types'
import { teachersApi } from '../api/teachers'

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const data = await teachersApi.getAllTeachers()
        setTeachers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teachers')
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  return { teachers, loading, error }
}
