import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLocalStorage } from '../../src/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('初期値が正しく設定される', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('initial')
  })

  it('値の更新が LocalStorage に保存される', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('LocalStorage に既存データがあれば復元される', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('stored-value')
  })

  it('オブジェクトの保存と復元ができる', () => {
    const initialValue = { id: '1', text: 'test', completed: false }
    const { result } = renderHook(() => useLocalStorage('test-key', initialValue))

    expect(result.current[0]).toEqual(initialValue)

    const newValue = { id: '2', text: 'updated', completed: true }
    act(() => {
      result.current[1](newValue)
    })

    expect(result.current[0]).toEqual(newValue)
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(newValue))
  })

  it('配列の保存と復元ができる', () => {
    const initialValue = [
      { id: '1', text: 'todo1', completed: false },
      { id: '2', text: 'todo2', completed: true },
    ]
    localStorage.setItem('test-key', JSON.stringify(initialValue))

    const { result } = renderHook(() =>
      useLocalStorage('test-key', [] as typeof initialValue)
    )

    expect(result.current[0]).toEqual(initialValue)
  })

  it('LocalStorage が使えない場合は通常の state として動作する', () => {
    const originalGetItem = Storage.prototype.getItem
    const originalSetItem = Storage.prototype.setItem

    Storage.prototype.getItem = vi.fn(() => {
      throw new Error('LocalStorage not available')
    })
    Storage.prototype.setItem = vi.fn(() => {
      throw new Error('LocalStorage not available')
    })

    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'))

    expect(result.current[0]).toBe('fallback')

    act(() => {
      result.current[1]('new-value')
    })

    expect(result.current[0]).toBe('new-value')

    Storage.prototype.getItem = originalGetItem
    Storage.prototype.setItem = originalSetItem
  })

  it('不正な JSON データの場合は初期値を使用する', () => {
    localStorage.setItem('test-key', 'invalid-json')

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))

    expect(result.current[0]).toBe('default')
  })
})
