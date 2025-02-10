const BASE_URL = 'https://easydev.club/api/v2'

export async function getTodos(status) {
	return await fetch(`${BASE_URL}/todos?filter=${status}`).then(response =>
		response.json()
	)
}

export async function addTodo(todo) {
	return await fetch(`${BASE_URL}/todos`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo),
	}).then(response => response.json())
}

export async function updateTodo(id, todo) {
	return await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo),
	}).then(response => response.json())
}

export async function deleteTodo(id) {
	return await fetch(`${BASE_URL}/todos/${id}`, {
		method: 'DELETE',
	}).then(response => {
		if (!response.ok) {
			throw new Error('Ошибка при удалении')
		}
		return null
	})
}
