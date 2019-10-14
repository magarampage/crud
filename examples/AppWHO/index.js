import React from 'react'
import { connect } from 'react-redux'
import Crud from '../../dist';
import createCommissionFields from './createCategoryFields';

// commission_list_container

function CrudCommisionList({ taskType, userTag }) {
	return (
		<div className="col-lg-12">
			<div className="box box-body crud-table checkerReview">
				<Crud.CrudFull
					crudRead="/v2/arbitrage/test-task/list"
					modelName="essayReview"
					size="middle"
					fixActionColumn
				/>
			</div>
		</div>
	)
}

const mapState = state => ({
	taskType: state.crudFilterValues && state.crudFilterValues.crudCommisionList
		? state.crudFilterValues.crudCommisionList.task_type
		: [],
	userTag: state.crudFilterValues && state.crudFilterValues.crudCommisionList
		? state.crudFilterValues.crudCommisionList.user_tag
		: [],
})
export default connect(
	mapState,
	null,
)(CrudCommisionList)
