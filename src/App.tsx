import React, { useState, useEffect } from 'react'

import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoStats from './components/TodoStats'

import { getTodos } from './api/todoApi'
import { Todo, TodoInfo, MetaResponse, TodoFilter } from './types/types'

function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [filter, setFilter] = useState<TodoFilter>('all')
	const [loading, setLoading] = useState<boolean>(false)
	const [info, setInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	})

	useEffect(() => {
		loadTodos()
	}, [filter])

	const loadTodos = async () => {
		setLoading(true)
		try {
			const data: MetaResponse<Todo, TodoInfo> = await getTodos(filter)
			setTodos(data.data)
			setInfo(data.info || { all: 0, completed: 0, inWork: 0 })
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
					<TodoStats filter={filter} info={info} setFilter={setFilter} />
					{loading ? (
						<p style={{ padding: 50 }}>Загрузка...</p>
					) : (
						<TodoList todos={todos} loadTodos={loadTodos} />
					)}
				</div>
			</div>
		</main>
	)
}

export default App
