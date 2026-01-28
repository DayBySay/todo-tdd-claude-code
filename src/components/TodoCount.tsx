interface TodoCountProps {
  count: number
}

function TodoCount({ count }: TodoCountProps) {
  const text = count === 1 ? '1 item left' : `${count} items left`
  return <span className="todo-count">{text}</span>
}

export default TodoCount
