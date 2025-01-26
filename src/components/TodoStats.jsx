export default function TodoStats({ todos, filter, setFilter }) {
	return (
		<div className='todo-stats'>
			<span
				onClick={() => setFilter('all')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'all' ? 'bold' : 'normal',
				}}
			>
				Все: {todos.length}{' '}
			</span>
			<span
				onClick={() => setFilter('in-progress')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'in-progress' ? 'bold' : 'normal',
				}}
			>
				В работе: {todos.filter(todo => !todo.isDone).length}
			</span>
			<span
				onClick={() => setFilter('done')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'done' ? 'bold' : 'normal',
				}}
			>
				Сделано: {todos.filter(todo => todo.isDone).length}
			</span>
		</div>
	)
}
