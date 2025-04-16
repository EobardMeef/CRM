import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import ProfilePage from './pages/ProfilePage'

export default function AppRouter() {
	return (
		<Routes>
			<Route path='/' element={<TodoPage />} />
			<Route path='/profile' element={<ProfilePage />} />
		</Routes>
	)
}
