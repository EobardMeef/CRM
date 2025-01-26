import { useState } from 'react'

export default function TodoForm({ onAdd }) {
	const [title, setTitle] = useState('')

	const handleInputChange = e => {
		setTitle(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		onAdd(title)
		setTitle('')
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
