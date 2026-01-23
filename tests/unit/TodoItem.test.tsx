import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from '../../src/components/TodoItem'
import { Todo } from '../../src/types/todo'

describe('TodoItem', () => {
  const incompleteTodo: Todo = { id: '1', text: 'Buy milk', completed: false }
  const completedTodo: Todo = { id: '2', text: 'Walk the dog', completed: true }

  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn()
    render(<TodoItem todo={incompleteTodo} onToggle={onToggle} onDelete={() => {}} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('shows line-through on completed todo text', () => {
    render(<TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />)

    const text = screen.getByText('Walk the dog')
    expect(text).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('does not show line-through on incomplete todo text', () => {
    render(<TodoItem todo={incompleteTodo} onToggle={() => {}} onDelete={() => {}} />)

    const text = screen.getByText('Buy milk')
    expect(text).not.toHaveStyle({ textDecoration: 'line-through' })
  })

  it('shows checked checkbox for completed todo', () => {
    render(<TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />)

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('shows unchecked checkbox for incomplete todo', () => {
    render(<TodoItem todo={incompleteTodo} onToggle={() => {}} onDelete={() => {}} />)

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<TodoItem todo={incompleteTodo} onToggle={() => {}} onDelete={onDelete} />)

    const deleteButton = screen.getByRole('button', { name: '×' })
    fireEvent.click(deleteButton)

    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('renders delete button with × symbol', () => {
    render(<TodoItem todo={incompleteTodo} onToggle={() => {}} onDelete={() => {}} />)

    const deleteButton = screen.getByRole('button', { name: '×' })
    expect(deleteButton).toBeInTheDocument()
  })
})
