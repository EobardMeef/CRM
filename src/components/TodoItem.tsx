import React, { useState } from 'react'
import { updateTodo, deleteTodo } from '../api/todoApi'
import { Todo } from '../types/types'
import { Checkbox, Button, Input } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

interface TodoItemProps {
	todo: Todo
	loadTodos: () => void
}

export default function TodoItem({ todo, loadTodos }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [newTitle, setNewTitle] = useState<string>(todo.title)

	const handleSave = async () => {
		try {
			await updateTodo(todo.id, {
				title: newTitle,
				isDone: todo.isDone,
			})
			loadTodos()
			setIsEditing(false)
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
		}
	}

	const handleCancel = () => {
		setNewTitle(todo.title)
		setIsEditing(false)
	}

	const handleCheckboxChange = async (e: CheckboxChangeEvent) => {
		try {
			await updateTodo(todo.id, {
				...todo,
				isDone: e.target.checked,
			})
			loadTodos()
		} catch (error) {
			console.error('Ошибка обновления задачи:', error)
		}
	}

	const handleDelete = async () => {
		try {
			await deleteTodo(todo.id)
			loadTodos()
		} catch (error) {
			console.error('Ошибка удаления задачи:', error)
		}
	}

	return (
		<li id='todo-item'>
			{isEditing ? (
				<>
					<Input
						className='todo-list-input'
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
					/>
					<div className='btn-center '>
						<Button
							className='btn-edit btn'
							type='primary'
							onClick={handleSave}
						>
							Save
						</Button>
						<Button className='btn-remove btn' onClick={handleCancel}>
							Cancel
						</Button>
					</div>
				</>
			) : (
				<>
					<div className='todo-content'>
						<Checkbox
							checked={todo.isDone}
							onChange={handleCheckboxChange}
							className='round-checkbox'
						>
							<span
								className='checkbox-label'
								style={{
									textDecoration: todo.isDone ? 'line-through' : 'none',
									opacity: todo.isDone ? 0.6 : 1,
									cursor: 'pointer',
								}}
							>
								{todo.title}
							</span>
						</Checkbox>
					</div>
					<div className='todo-buttons'>
						<Button className='btn-edit btn' onClick={() => setIsEditing(true)}>
							Edit
						</Button>
						<Button className='btn-remove btn' onClick={handleDelete}>
							Delete
						</Button>
					</div>
				</>
			)}
		</li>
	)
}
