import { useState } from 'react'
import { addTodo } from '../api/todoApi'

export default function TodoForm({ onAdd }) {
	const [title, setTitle] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		if (title.length < 2 || title.length > 64) {
			alert('Заголовок должен быть не менее 2 и не более 64 символ')
			return
		}
		try {
			await addTodo({ title: title, isDone: false })
			onAdd()
			setTitle('')
		} catch (error) {
			console.error('Ошибка добавления задачи: ', error)
		}
	}

	return (
		<form id='form' onSubmit={handleSubmit}>
			<input
				type='text'
				className='form-input'
				placeholder='Task To Be Done...'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<button className='btn-add btn' type='submit'>
				Add
			</button>
		</form>
	)
}
