import { Todo } from '../types/todo'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)}>×</button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
