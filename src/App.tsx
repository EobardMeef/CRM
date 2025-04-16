import React, { useState } from 'react'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import AppRouter from './router'
import { Layout, Menu, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const { Sider, Content } = Layout

function SidebarMenu() {
	const location = useLocation()

	return (
		<Menu theme='light' mode='inline' selectedKeys={[location.pathname]}>
			<Menu.Item key='/'>
				<Link to='/'>Список задач</Link>
			</Menu.Item>
			<Menu.Item key='/profile'>
				<Link to='/profile'>Профиль</Link>
			</Menu.Item>
		</Menu>
	)
}

export default function App() {
	const [collapsed, setCollapsed] = useState(true)

	return (
		<BrowserRouter>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					width={200}
					collapsedWidth={0}
					onMouseEnter={() => setCollapsed(false)}
					onMouseLeave={() => setCollapsed(true)}
					style={{
						background: '#fff',
						height: '100vh',
						borderRight: '1px solid #e0e0e0',
						position: 'fixed',
						left: 0,
						top: 0,
						bottom: 0,
						zIndex: 1000,
						transition: 'all 0.3s',
					}}
				>
					<SidebarMenu />
				</Sider>
				<Layout style={{ background: '#fff' }}>
					<Content
						style={{
							minHeight: '100vh',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: 24,
							transition: 'margin-left 0.3s',
						}}
					>
						{collapsed && (
							<Button
								icon={<MenuOutlined />}
								onClick={() => setCollapsed(false)}
								style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
							/>
						)}

						<div style={{ width: '100%', maxWidth: 800 }}>
							<AppRouter />
						</div>
					</Content>
				</Layout>
			</Layout>
		</BrowserRouter>
	)
}
