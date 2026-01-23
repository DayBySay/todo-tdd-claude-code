import { useState } from 'react'
import { Todo, FilterType } from './types/todo'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import TodoCount from './components/TodoCount'
import { filterTodos } from './utils/filterTodos'
import { countActiveTodos } from './utils/countActiveTodos'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterType>('all')

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = filterTodos(todos, filter)
  const activeCount = countActiveTodos(todos)

  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput onAdd={handleAdd} />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <TodoCount count={activeCount} />
    </div>
  )
}

export default App
