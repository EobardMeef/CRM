import React from 'react'
import { TodoFilter, TodoInfo } from '../types/types'

import { Tabs } from 'antd'

interface TodoStatsProps {
	info: TodoInfo
	filter: TodoFilter
	setFilter: (filter: TodoFilter) => void
}

export default function TodoStats({ info, filter, setFilter }: TodoStatsProps) {
	const handleTabChange = (key: string) => {
		setFilter(key as TodoFilter)
	}
	return (
		<Tabs activeKey={filter} onChange={handleTabChange}>
			<Tabs.TabPane tab={`Все (${info.all})`} key='all' />
			<Tabs.TabPane tab={`В работе (${info.inWork})`} key='inWork' />
			<Tabs.TabPane tab={`Сделано (${info.completed})`} key='completed' />
		</Tabs>
	)
}
