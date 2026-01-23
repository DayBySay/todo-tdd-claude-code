import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoList from '../../src/components/TodoList'
import { Todo } from '../../src/types/todo'

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'Buy milk', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
  ]

  it('renders a list of todos', () => {
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  it('renders checkbox for each todo', () => {
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(2)
  })

  it('renders delete button for each todo', () => {
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />)

    const deleteButtons = screen.getAllByRole('button', { name: '×' })
    expect(deleteButtons).toHaveLength(2)
  })

  it('renders empty list when no todos', () => {
    render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list.children).toHaveLength(0)
  })

  it('shows completed todos with checked checkbox', () => {
    render(<TodoList todos={mockTodos} onToggle={() => {}} onDelete={() => {}} />)

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(checkboxes[0].checked).toBe(false) // Buy milk - not completed
    expect(checkboxes[1].checked).toBe(true)  // Walk the dog - completed
  })
})
