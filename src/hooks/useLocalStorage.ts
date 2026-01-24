import { useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return initialValue
      }
      return JSON.parse(item) as T
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // LocalStorage が使えない場合は無視
    }
  }

  return [storedValue, setValue]
}
