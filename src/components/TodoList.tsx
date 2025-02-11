import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../types/types'

interface TodoListProps {
	todos: Todo[]
	filter: string
	onUpdate: () => void
	onDelete: () => void
}

export default function TodoList({
	todos,
	filter,
	onUpdate,
	onDelete,
}: TodoListProps) {
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
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	)
}
