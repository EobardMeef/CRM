import React, { useState, useEffect } from 'react'

import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoStats from './components/TodoStats'

import { getTodos } from './api/todoApi'
import { Todo, TodoInfo, MetaResponse } from './types/types'

function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [filter, setFilter] = useState<string>('all')
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		loadTodos()
	}, [filter])

	const loadTodos = async () => {
		setLoading(true)
		try {
			const data: MetaResponse<Todo, TodoInfo> = await getTodos(filter)
			setTodos(data.data)
		} catch (error) {
			console.error('Ошибка загрузки задач:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main id='main'>
			<div className='container'>
				<div className='wrapper'>
					<TodoForm onAdd={loadTodos} />
					<TodoStats filter={filter} setFilter={setFilter} todos={todos} />
					{loading ? (
						<p style={{ padding: 50 }}>Загрузка...</p>
					) : (
						<TodoList
							todos={todos}
							filter={filter}
							onUpdate={loadTodos}
							onDelete={loadTodos}
						/>
					)}
				</div>
			</div>
		</main>
	)
}

export default App
