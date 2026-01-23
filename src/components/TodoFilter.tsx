import { FilterType } from '../types/todo'

interface TodoFilterProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const filters: FilterType[] = ['all', 'active', 'completed']
  const labels: Record<FilterType, string> = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  }

  return (
    <div>
      {filters.map((filter) => (
        <button
          key={filter}
          className={currentFilter === filter ? 'selected' : ''}
          onClick={() => onFilterChange(filter)}
        >
          {labels[filter]}
        </button>
      ))}
    </div>
  )
}

export default TodoFilter
