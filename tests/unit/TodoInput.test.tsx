import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoInput from '../../src/components/TodoInput'

describe('TodoInput', () => {
  it('renders an input with placeholder "What needs to be done?"', () => {
    render(<TodoInput onAdd={() => {}} />)
    const input = screen.getByPlaceholderText('What needs to be done?')
    expect(input).toBeInTheDocument()
  })

  it('calls onAdd with input value when Enter is pressed', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')

    expect(onAdd).toHaveBeenCalledWith('Buy milk')
  })

  it('does not call onAdd when input is empty and Enter is pressed', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, '{Enter}')

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('does not call onAdd when input is only whitespace and Enter is pressed', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, '   {Enter}')

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('clears input after adding a todo', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoInput onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement
    await user.type(input, 'Buy milk{Enter}')

    expect(input.value).toBe('')
  })
})
