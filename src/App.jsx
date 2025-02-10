import { useState, useEffect } from 'react'

import { getTodos } from './api/todoApi'

import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoStats from './components/TodoStats'

function App() {
	const [todos, setTodos] = useState([])
	const [filter, setFilter] = useState('all')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadTodos()
	}, [filter])

	const loadTodos = async () => {
		setLoading(true)
		try {
			const data = await getTodos(filter)
			setTodos(data.data)
		} catch (error) {
			console.error('Ошибка загрузки задачи', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
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
								onDelete={loadTodos}
								onUpdate={loadTodos}
							/>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default App
