import React from 'react'
import { Input, Button, Checkbox, Select, DatePicker } from 'antd';
import moment from 'moment'
import 'moment/locale/ru'
import Index from './VirtualizedSelect'

const { Option } = Select;

export default (name, type, options) => (props) => {
	const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props
	return (
		<div
			className="custom-filter-dropdown"
		>
			{type === 'checkbox'
				? (
					<span>
						<Checkbox
							value={selectedKeys}
							onChange={e => setSelectedKeys(e.target.checked.toString())}
							onPressEnter={() => { confirm() }}
						/>
						<br />
					</span>
				)
				: type === 'select'
					? <Index options={options} data={props} />
					: type === 'date'
						? (
							<DatePicker
								value={selectedKeys && !(selectedKeys instanceof Array)
									? moment(selectedKeys, 'DD/MM/YYYY')
										.locale('ru')
									: null
								}
								onChange={value => setSelectedKeys(value)}
								onPressEnter={() => { confirm() }}
								placeholder="Выберите дату"
								format="DD/MM/YYYY"
								style={{ marginRight: '8px' }}
							/>
						)
						: (
							<Input
								type={type}
								placeholder="Поиск"
								value={selectedKeys}
								onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
								onPressEnter={() => { confirm() }}
							/>
						)
			}
			<Button type="primary" onClick={() => { confirm() }}>Поиск</Button>
			<Button onClick={() => { clearFilters() }}>Сбросить</Button>
		</div>
	)
}
