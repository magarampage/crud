import { CrudFull } from '../../dist';

import React, { useState, useEffect } from 'react'
import { getUrlParameters } from '../../src/helpers/urlHelpers'


const Crud = (props) => {

	const { doer_id = false } = getUrlParameters()
	const doerQuery = doer_id ? '?doer_id=' + doer_id : ''
	return (
		<div className="box box-body crud-table">
			<CrudFull
				crudRead={`/v2/admin/karma-doer/list${doerQuery}`}
				modelName="KarmaList"
				createDisabled
				// createButtonTitleId={"sidebar.contractor.work.new"}

			/>
		</div>
	)
}


export default Crud
