import { useState, useEffect } from 'react'
import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
} from './components/api/todoApi'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Header from './components/Header/Header'
import TodoStats from './components/TodoStats'

function App() {
	const [todos, setTodos] = useState([])
	const [filter, setFilter] = useState('all')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		loadTodos(filter)
	}, [filter])

	const loadTodos = async filter => {
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

	const handleAdd = async title => {
		if (title.length < 2 || title.length > 64) {
			alert('Заголовок должен быть не менее 2 и не более 64 символов')
			return
		}
		try {
			const newTodo = await addTodo({ title: title, isDone: false })
			setTodos(prevTodos => [...prevTodos, newTodo])
		} catch (error) {
			console.error('Ошибка добавления задачи:', error)
		}
	}

	const handleUpdate = async (id, updatedFields) => {
		try {
			const updatedTodo = await updateTodo(id, updatedFields)
			setTodos(prevTodos =>
				prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
			)
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
		}
	}

	const handleToggle = (id, isDone) => {
		handleUpdate(id, { isDone: !isDone })
	}

	const handleDelete = async id => {
		try {
			await deleteTodo(id)
			setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
		} catch (error) {
			console.error('Ошибка удаления задачи:', error)
		}
	}

	const filteredTodos = todos.filter(todo => {
		if (filter === 'all') return true
		if (filter === 'in-progress') return !todo.isDone
		if (filter === 'done') return todo.isDone
		return true
	})

	return (
		<>
			<Header />
			<main id='main'>
				<div className='container'>
					<div className='wrapper'>
						<TodoForm onAdd={handleAdd} />
						<TodoStats filter={filter} setFilter={setFilter} todos={todos} />
						{loading ? (
							<p style={{ padding: 50 }}>Загрузка...</p>
						) : (
							<TodoList
								todos={filteredTodos}
								onToggle={handleToggle}
								onDelete={handleDelete}
								onUpdate={handleUpdate}
							/>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default App
