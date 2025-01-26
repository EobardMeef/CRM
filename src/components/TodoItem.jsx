import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete }) {
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(todo.title)

	const handleSave = () => {
		onUpdate(todo.id, {
			title: newTitle,
			isDone: todo.isDone,
		})
		setIsEditing(false)
	}

	const handleCancel = () => {
		setNewTitle(todo.title)
		setIsEditing(false)
	}

	const handleCheckboxChange = () => {
		onUpdate(todo.id, {
			...todo,
			isDone: !todo.isDone,
		})
	}

	return (
		<li id='todo-item'>
			{isEditing ? (
				<>
					<input
						className='todo-list-input'
						type='text'
						value={newTitle}
						onChange={e => {
							setNewTitle(e.target.value)
						}}
					/>
					<div>
						<button className='btn-edit btn' onClick={handleSave}>
							Save
						</button>
						<button className='btn-remove btn' onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</>
			) : (
				<>
					<div className='todo-content'>
						<input
							type='checkbox'
							id={`checkbox-${todo.id}`}
							checked={todo.isDone}
							onChange={handleCheckboxChange}
							className='round-checkbox'
						/>
						<label
							htmlFor={`checkbox-${todo.id}`}
							style={{
								textDecoration: todo.isDone ? 'line-through' : 'none',
								opacity: todo.isDone ? '0.6' : '1',
								cursor: 'pointer',
							}}
						>
							{todo.title}
						</label>
					</div>
					<div className='todo-buttons'>
						<button
							className='btn-edit btn'
							onClick={() => {
								setIsEditing(true)
							}}
						>
							E
						</button>
						<button
							className='btn-remove btn'
							onClick={() => {
								onDelete(todo.id)
							}}
						>
							D
						</button>
					</div>
				</>
			)}
		</li>
	)
}
