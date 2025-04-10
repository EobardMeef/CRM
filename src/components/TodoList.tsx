import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../types/types'

interface TodoListProps {
	todos: Todo[]
	loadTodos: () => void
}

export default function TodoList({ todos, loadTodos }: TodoListProps) {
	if (!todos.length) {
		return <p style={{ padding: 50 }}>Задач нет</p>
	}

	return (
		<ul id='todos'>
			{todos.map(todo => (
				<TodoItem key={todo.id} todo={todo} loadTodos={loadTodos} />
			))}
		</ul>
	)
}
