import React, { useState } from 'react'
import { updateTodo, deleteTodo } from '../api/todoApi'
import { Todo } from '../types/types'

interface TodoItemProps {
	todo: Todo
	onUpdate: () => void
	onDelete: () => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(todo.title)

	const handleSave = async () => {
		try {
			await updateTodo(todo.id, {
				title: newTitle,
				isDone: todo.isDone,
			})
			onUpdate()
			setIsEditing(false)
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
		}
	}

	const handleCancel = () => {
		setNewTitle(todo.title)
		setIsEditing(false)
	}

	const handleCheckboxChange = async () => {
		try {
			await updateTodo(todo.id, {
				...todo,
				isDone: !todo.isDone,
			})
			onUpdate()
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
		}
	}

	const handleDelete = async () => {
		try {
			await deleteTodo(todo.id)
			onDelete()
		} catch (error) {
			console.error('Ошибка удаления задачи:', error)
		}
	}

	return (
		<li id='todo-item'>
			{isEditing ? (
				<>
					<input
						className='todo-list-input'
						type='text'
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
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
						<button className='btn-edit btn' onClick={() => setIsEditing(true)}>
							E
						</button>
						<button className='btn-remove btn' onClick={handleDelete}>
							D
						</button>
					</div>
				</>
			)}
		</li>
	)
}
