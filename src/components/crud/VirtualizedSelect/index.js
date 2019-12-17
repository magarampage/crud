import { Select } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import SuperSelect from './menulist'

const Option = Select.Option;

const children = [];

for (let i = 0; i < 10000; i++) {
	children.push(
		<Option value={i + 'aa'} key={i}>
			{i}
		</Option>
	);
}
export default function Index({ data, options }) {
	const { setSelectedKeys, selectedKeys, confirm, clearFilters } = data


	return (
		<div style={{ width: '300px' }}>

			<SuperSelect
				value={selectedKeys}
				placeholder="Выбрать"
				// onChange={(e) => {
				// 	setSelectedKeys(e);
				// 	// confirm();
				// }}
				onPressEnter={() => { confirm() }}
				style={{
					width: '130px',
					marginRight: '8px'
				}}
				showSearch
				filterOption={(search, option) =>
					option.props.children.toLowerCase()
						.indexOf(search.toLowerCase()) >= 0
				}
				onSearch={() => {}}
			>
				{options.map(opt => (
					<Select.Option
						value={opt.value}
						key={opt.value}
						onClick={(e) => {
							setSelectedKeys(opt.value);
							// setTimeout(() => confirm(), 100);
						}}
					>
						{opt.text}
					</Select.Option>
				))}
			</SuperSelect>
		</div>
		// <Select
		// 	value={selectedKeys}
		// 	placeholder="Выбрать"
		// 	onChange={(e) => {
		// 		setSelectedKeys(e);
		// 		confirm();
		// 	}}
		// 	onPressEnter={() => { confirm() }}
		// 	style={{
		// 		width: '130px',
		// 		marginRight: '8px'
		// 	}}
		// 	showSearch
		// 	filterOption={(search, option) =>
		// 		option.props.children.toLowerCase()
		// 			.indexOf(search.toLowerCase()) >= 0
		// 	}
		// 	onSearch={() => {}}
		// >
		// 	{options.map(opt => (
		// 		<Select.Option
		// 			value={opt.value}
		// 			key={opt.value}
		// 			onClick={(e) => {
		// 				setSelectedKeys(opt.value);
		// 				setTimeout(() => confirm(), 100);
		// 			}}
		// 		>
		// 			{opt.text}
		// 		</Select.Option>
		// 	))}
		// </Select>
	)
}

Index.propTypes = {
	children: PropTypes.node,
	key: PropTypes.string,
	index: PropTypes.number,
	style: PropTypes.object,
	isScrolling: PropTypes.bool,
	isVisible: PropTypes.bool
}
