import { useState } from 'react'
import { Todo, FilterType } from './types/todo'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'
import TodoCount from './components/TodoCount'
import { filterTodos } from './utils/filterTodos'
import { countActiveTodos } from './utils/countActiveTodos'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo-app-todos', [])
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
      <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
        <div className="todo-footer">
          <TodoCount count={activeCount} />
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        </div>
      </div>
    </div>
  )
}

export default App
