import axios from 'axios'
import {
	Todo,
	TodoRequest,
	MetaResponse,
	TodoInfo,
	TodoFilter,
} from '../types/types'

const BASE_URL = 'https://easydev.club/api/v2'

const api = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
})

export async function getTodos(
	status: TodoFilter
): Promise<MetaResponse<Todo, TodoInfo>> {
	const response = await api.get<MetaResponse<Todo, TodoInfo>>('/todos', {
		params: { filter: status },
	})
	return response.data
}

export async function addTodo(todo: TodoRequest): Promise<Todo> {
	const response = await api.post<Todo>('/todos', todo)
	return response.data
}

export async function updateTodo(id: number, todo: TodoRequest): Promise<Todo> {
	const response = await api.put<Todo>(`/todos/${id}`, todo)
	return response.data
}

export async function deleteTodo(id: number): Promise<void> {
	await api.delete(`/todos/${id}`)
}
