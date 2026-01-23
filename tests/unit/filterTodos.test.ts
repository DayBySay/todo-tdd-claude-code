import { describe, it, expect } from 'vitest'
import { filterTodos } from '../../src/utils/filterTodos'
import { Todo } from '../../src/types/todo'

describe('filterTodos', () => {
  const todos: Todo[] = [
    { id: '1', text: 'Buy milk', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
    { id: '3', text: 'Read a book', completed: false },
  ]

  it('returns all todos when filter is "all"', () => {
    const result = filterTodos(todos, 'all')
    expect(result).toHaveLength(3)
    expect(result).toEqual(todos)
  })

  it('returns only active (incomplete) todos when filter is "active"', () => {
    const result = filterTodos(todos, 'active')
    expect(result).toHaveLength(2)
    expect(result).toEqual([
      { id: '1', text: 'Buy milk', completed: false },
      { id: '3', text: 'Read a book', completed: false },
    ])
  })

  it('returns only completed todos when filter is "completed"', () => {
    const result = filterTodos(todos, 'completed')
    expect(result).toHaveLength(1)
    expect(result).toEqual([{ id: '2', text: 'Walk the dog', completed: true }])
  })

  it('returns empty array when no todos match the filter', () => {
    const incompleteTodos: Todo[] = [
      { id: '1', text: 'Buy milk', completed: false },
    ]
    const result = filterTodos(incompleteTodos, 'completed')
    expect(result).toHaveLength(0)
  })

  it('returns empty array when input is empty', () => {
    const result = filterTodos([], 'all')
    expect(result).toHaveLength(0)
  })
})
