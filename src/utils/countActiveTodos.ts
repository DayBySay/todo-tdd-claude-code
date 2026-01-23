import { Todo } from '../types/todo'

export function countActiveTodos(todos: Todo[]): number {
  return todos.filter((todo) => !todo.completed).length
}
