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
			split={false}
			dataSource={todos}
			renderItem={todo => (
				<List.Item style={{ padding: 0 }} key={todo.id}>
					<TodoItem todo={todo} loadTodos={loadTodos} />
				</List.Item>
			)}
		/>
	)
}
