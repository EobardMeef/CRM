import { Todo, TodoRequest, MetaResponse, TodoInfo } from '../types/types'

const BASE_URL = 'https://easydev.club/api/v2'

export async function getTodos(
	status: string
): Promise<MetaResponse<Todo, TodoInfo>> {
	const response = await fetch(`${BASE_URL}/todos?filter=${status}`)
	return response.json()
}

export async function addTodo(todo: TodoRequest): Promise<Todo> {
	const response = await fetch(`${BASE_URL}/todos`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo),
	})
	return response.json()
}

export async function updateTodo(id: number, todo: TodoRequest): Promise<Todo> {
	const response = await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo),
	})
	return response.json()
}

export async function deleteTodo(id: number): Promise<void> {
	await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'DELETE',
	})
}
