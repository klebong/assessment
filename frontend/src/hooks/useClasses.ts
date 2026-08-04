import { useState, useEffect } from 'react'
import { Class } from '../types'
import { classesApi } from '../api/classes'

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true)
        const data = await classesApi.getAllClasses()
        setClasses(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch classes')
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  return { classes, loading, error }
}
