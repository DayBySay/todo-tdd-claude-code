import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoFilter from '../../src/components/TodoFilter'

describe('TodoFilter', () => {
  it('renders All, Active, and Completed filter buttons', () => {
    render(<TodoFilter currentFilter="all" onFilterChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('calls onFilterChange with "all" when All button is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter currentFilter="active" onFilterChange={onFilterChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(onFilterChange).toHaveBeenCalledWith('all')
  })

  it('calls onFilterChange with "active" when Active button is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter currentFilter="all" onFilterChange={onFilterChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(onFilterChange).toHaveBeenCalledWith('active')
  })

  it('calls onFilterChange with "completed" when Completed button is clicked', () => {
    const onFilterChange = vi.fn()
    render(<TodoFilter currentFilter="all" onFilterChange={onFilterChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(onFilterChange).toHaveBeenCalledWith('completed')
  })

  it('highlights the All button when currentFilter is "all"', () => {
    render(<TodoFilter currentFilter="all" onFilterChange={() => {}} />)

    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton).toHaveClass('selected')
  })

  it('highlights the Active button when currentFilter is "active"', () => {
    render(<TodoFilter currentFilter="active" onFilterChange={() => {}} />)

    const activeButton = screen.getByRole('button', { name: 'Active' })
    expect(activeButton).toHaveClass('selected')
  })

  it('highlights the Completed button when currentFilter is "completed"', () => {
    render(<TodoFilter currentFilter="completed" onFilterChange={() => {}} />)

    const completedButton = screen.getByRole('button', { name: 'Completed' })
    expect(completedButton).toHaveClass('selected')
  })
})
