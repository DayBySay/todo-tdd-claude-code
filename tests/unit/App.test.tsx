import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../src/App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Todo App')).toBeInTheDocument()
  })

  it('renders the input field', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
  })

  it('renders filter buttons', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('renders count display', () => {
    render(<App />)
    expect(screen.getByText('0 items left')).toBeInTheDocument()
  })

  it('adds a new todo when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('1 item left')).toBeInTheDocument()
  })

  it('toggles todo completion', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(screen.getByText('0 items left')).toBeInTheDocument()
    expect(screen.getByText('Buy milk')).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')

    const deleteButton = screen.getByRole('button', { name: '×' })
    await user.click(deleteButton)

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })

  it('filters todos by active', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')
    await user.type(input, 'Walk the dog{Enter}')

    const checkbox = screen.getAllByRole('checkbox')[0]
    await user.click(checkbox)

    const activeButton = screen.getByRole('button', { name: 'Active' })
    await user.click(activeButton)

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  it('filters todos by completed', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')
    await user.type(input, 'Walk the dog{Enter}')

    const checkbox = screen.getAllByRole('checkbox')[0]
    await user.click(checkbox)

    const completedButton = screen.getByRole('button', { name: 'Completed' })
    await user.click(completedButton)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument()
  })

  it('shows all todos when All filter is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Buy milk{Enter}')
    await user.type(input, 'Walk the dog{Enter}')

    const checkbox = screen.getAllByRole('checkbox')[0]
    await user.click(checkbox)

    const completedButton = screen.getByRole('button', { name: 'Completed' })
    await user.click(completedButton)

    const allButton = screen.getByRole('button', { name: 'All' })
    await user.click(allButton)

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })
})
