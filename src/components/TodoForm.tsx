import React, { useState } from 'react'
import { addTodo } from '../api/todoApi'
import message from 'antd/es/message'
import { Form, Input, Button } from 'antd'

interface TodoFormProps {
	onAdd: () => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
	const [form] = Form.useForm()

	const handleSubmit = async (values: { title: string }) => {
		try {
			await addTodo({ title: values.title, isDone: false })
			message.success('Задача добавлена')
			onAdd()
			form.resetFields()
		} catch (error) {
			message.error('Ошибка добавления задачи')
			console.error('Ошибка добавления задачи:', error)
		}
	}

	return (
		<Form
			form={form}
			id='form'
			onFinish={handleSubmit}
			layout='inline'
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Form.Item
				name='title'
				rules={[
					{ required: true, message: 'Заголовок обязателен' },
					{ min: 2, message: 'Минимум 2 символа' },
					{ max: 64, message: 'Максимум 64 символа' },
				]}
			>
				<Input
					style={{ borderRadius: 0 }}
					className='form-input'
					placeholder='Task To Be Done...'
				/>
			</Form.Item>
			<Form.Item>
				<Button className='btn-add btn' type='primary' htmlType='submit'>
					Add
				</Button>
			</Form.Item>
		</Form>
	)
}
