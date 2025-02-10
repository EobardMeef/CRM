import TodoItem from './TodoItem'

export default function TodoList({ todos, filter, onDelete, onUpdate }) {
	if (!todos.length) {
		return <p style={{ padding: 50 }}>Задач нет :)</p>
	}

	const filteredTodos = todos.filter(todo => {
		if (filter === 'all') return true
		if (filter === 'in-progress') return !todo.isDone
		if (filter === 'done') return todo.isDone
		return true
	})
	return (
		<ul id='todos'>
			{filteredTodos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onDelete={onDelete}
					onUpdate={onUpdate}
				/>
			))}
		</ul>
	)
}
