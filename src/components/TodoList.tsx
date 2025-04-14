import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../types/types'

import { List } from 'antd'

interface TodoListProps {
	todos: Todo[]
	loadTodos: () => void
}

export default function TodoList({ todos, loadTodos }: TodoListProps) {
	if (!todos.length) {
		return <p style={{ padding: 50 }}>Задач нет</p>
	}

	return (
		<List
			dataSource={todos}
			renderItem={todo => (
				<List.Item>
					<TodoItem key={todo.id} todo={todo} loadTodos={loadTodos} />
				</List.Item>
			)}
		/>
	)
}
