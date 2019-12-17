import { CrudFull } from '../../src';

import React, { useState, useEffect } from 'react'


const Crud = (props) => (
	<div className="col-lg-12">
		<div className="box box-body crud-table checkerReview">
			<CrudFull
				crudRead="/v2/admin/test-task-user/list"
				modelName="essayReview"
				size="middle"
				fixActionColumn
			/>
		</div>
	</div>
)


export default Crud
