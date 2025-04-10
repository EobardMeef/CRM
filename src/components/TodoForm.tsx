import React, { useState } from 'react'
import { addTodo } from '../api/todoApi'

interface TodoFormProps {
	onAdd: () => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
	const [title, setTitle] = useState<string>('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (title.length < 2 || title.length > 64) {
			alert('Заголовок должен быть не менее 2 и не более 64 символов')
			return
		}
		try {
			await addTodo({ title: title, isDone: false })
			onAdd()
			setTitle('')
		} catch (error) {
			console.error('Ошибка добавления задачи:', error)
		}
	}

	return (
		<form id='form' onSubmit={handleSubmit}>
			<input
				type='text'
				className='form-input'
				placeholder='Task To Be Done...'
				value={title}
				onChange={handleInputChange}
			/>
			<button className='btn-add btn' type='submit'>
				Add
			</button>
		</form>
	)
}
