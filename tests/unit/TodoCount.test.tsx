import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TodoCount from '../../src/components/TodoCount'

describe('TodoCount', () => {
  it('displays "0 items left" when count is 0', () => {
    render(<TodoCount count={0} />)
    expect(screen.getByText('0 items left')).toBeInTheDocument()
  })

  it('displays "1 item left" when count is 1', () => {
    render(<TodoCount count={1} />)
    expect(screen.getByText('1 item left')).toBeInTheDocument()
  })

  it('displays "2 items left" when count is 2', () => {
    render(<TodoCount count={2} />)
    expect(screen.getByText('2 items left')).toBeInTheDocument()
  })

  it('displays "5 items left" when count is 5', () => {
    render(<TodoCount count={5} />)
    expect(screen.getByText('5 items left')).toBeInTheDocument()
  })
})
