import { describe, it, expect } from 'vitest'
import { countActiveTodos } from '../../src/utils/countActiveTodos'
import { Todo } from '../../src/types/todo'

describe('countActiveTodos', () => {
  it('returns 0 when todos is empty', () => {
    const result = countActiveTodos([])
    expect(result).toBe(0)
  })

  it('returns count of incomplete todos', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Walk the dog', completed: true },
      { id: '3', text: 'Read a book', completed: false },
    ]
    const result = countActiveTodos(todos)
    expect(result).toBe(2)
  })

  it('returns 0 when all todos are completed', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Buy milk', completed: true },
      { id: '2', text: 'Walk the dog', completed: true },
    ]
    const result = countActiveTodos(todos)
    expect(result).toBe(0)
  })

  it('returns total count when no todos are completed', () => {
    const todos: Todo[] = [
      { id: '1', text: 'Buy milk', completed: false },
      { id: '2', text: 'Walk the dog', completed: false },
    ]
    const result = countActiveTodos(todos)
    expect(result).toBe(2)
  })
})
