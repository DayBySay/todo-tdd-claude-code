import { useState, KeyboardEvent } from 'react'

interface TodoInputProps {
  onAdd: (text: string) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = value.trim()
      if (trimmed) {
        onAdd(trimmed)
        setValue('')
      }
    }
  }

  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default TodoInput
