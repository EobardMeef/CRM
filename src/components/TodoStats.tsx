import React from 'react'
import { TodoInfo } from '../types/types'

interface TodoStatsProps {
	info: TodoInfo
	filter: string
	setFilter: (filter: string) => void
}

export default function TodoStats({ info, filter, setFilter }: TodoStatsProps) {
	return (
		<div className='todo-stats'>
			<span
				onClick={() => setFilter('all')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'all' ? 'bold' : 'normal',
				}}
			>
				Все: {info.all}
			</span>
			<span
				onClick={() => setFilter('inWork')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'inWork' ? 'bold' : 'normal',
				}}
			>
				В работе: {info.inWork}
			</span>
			<span
				onClick={() => setFilter('completed')}
				style={{
					cursor: 'pointer',
					fontWeight: filter === 'completed' ? 'bold' : 'normal',
				}}
			>
				Сделано: {info.completed}
			</span>
		</div>
	)
}
