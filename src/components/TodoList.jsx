import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
	if (!todos.length) {
		return <p style={{ padding: 50 }}>Задач нет :)</p>
	}
	return (
		<ul id='todos'>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					onUpdate={onUpdate}
				/>
			))}
		</ul>
	)
}
