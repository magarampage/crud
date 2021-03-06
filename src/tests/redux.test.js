import actions from '../redux/actions'
import {
	deleteModelSaga,
	restoreModelSaga,
	closeModalSaga,
	submitModelsModalFormFailSaga,
	notifySaga,
	fetchCrudFilterValuesSaga,
	createModelSaga,
	selectCrudParams,
	changeModelSaga,
	updateModelsSaga,
	fetchCrudModelsSuccessSaga
} from '../redux/saga'
import {
	crudFilterValuesReducer,
	crudModelsReducer,
	crudActionsFuncReducer,
	isOpenModelModalReducer,
	modelModalFormReducer,
	crudParamsReducer,
	crudCreateModalLoadingReducer
} from '../redux/reducer'
import { ERROR, START, SUCCESS } from '../constants';
import { request } from 'sm-redux-saga-request';
import { put, select } from 'redux-saga/effects'
import { stopSubmit } from 'redux-form';
import notification from '../notification';
import {SUCCESS_REQ} from '../../examples/redux/constants';

function testingReducer(initialState, action, reducer, error, response) {
	it('should return initialState', () => {
		expect(reducer(initialState, {})).toEqual(initialState)
	});

	it('should return loading field true', () => {
		expect(reducer(initialState, { type: action + START })).toEqual({ loading: true })
	});

	it('should return error field', () => {
		const error = 'error' || error;
		expect(reducer(initialState, { type: action + ERROR, error })).toEqual({ error });
	});

	it('should return response', () => {
		const token = 'token';
		const res = { data: { token } } || response;
		expect(reducer(initialState, { type: action + SUCCESS, res })).toEqual(res);
	});
}

describe('crudModelsReducer', () => {
	const initialState = {};
	const response = { data: 'somedata' };
	const payload = { params: { modelName: 'ModelName' } };
	const error = 'error'
	const actionSuccess = {
		type: actions.FETCH_CRUD_MODELS + SUCCESS,
		response,
		payload
	};

	const actionError = {
		type: actions.FETCH_CRUD_MODELS + ERROR,
		response,
		payload,
		error
	};

	const actionStart = {
		type: actions.FETCH_CRUD_MODELS + START,
		payload
	};

	it('should return initialState', () => {
		expect(crudModelsReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce crud models successfully', () => {
		expect(crudModelsReducer(initialState, actionSuccess)).toEqual({ [payload.params.modelName]: response })
	});

	it('should reduce crud models with error', () => {
		expect(crudModelsReducer(initialState, actionError)).toEqual({
			[payload.params.modelName]: {
				...initialState[payload.params.modelName],
				loading: false,
				error
			}
		})
	});

	it('should reduce start fetching crud models', () => {
		expect(crudModelsReducer(initialState, actionStart)).toEqual({
			[payload.params.modelName]: {
				...initialState[payload.params.modelName],
				loading: true
			}
		})
	});

});

describe('crudFilterValuesReducer', () => {
	const initialState = {};
	const response = { data: 'somedata' };
	const payload = { filter: 'filtername' };
	const error = 'error';
	const actionSuccess = {
		type: actions.FETCH_CRUD_FILTER_VALUES + SUCCESS,
		response,
		payload
	};

	const actionError = {
		type: actions.FETCH_CRUD_FILTER_VALUES + ERROR,
		response,
		payload,
		error
	};

	const actionStart = {
		type: actions.FETCH_CRUD_FILTER_VALUES + START,
		payload
	};

	it('should return filters initialState', () => {
		expect(crudFilterValuesReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce crud filters successfully', () => {
		expect(crudFilterValuesReducer(initialState, actionSuccess)).toEqual({
			loading: false,
			[payload.modelName]: {
				...initialState[payload.modelName],
				[payload.filter]: response.data,
			}
		})
	});

	it('should reduce crud filters with error', () => {
		expect(crudFilterValuesReducer(initialState, actionError)).toEqual({ loading: false, error })
	});

	it('should reduce start fetching crud models', () => {
		expect(crudFilterValuesReducer(initialState, actionStart)).toEqual({ loading: true })
	});
});

describe('crudActionsFuncReducer', () => {
	const initialState = null;
	const payload = { modelName: 'ModelName', func: () => {} };
	const action = {
		type: actions.SET_CRUD_ACTIONS_FUNC,
		payload
	};

	it('should return filters initialState', () => {
		expect(crudActionsFuncReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce actions function', () => {
		expect(crudActionsFuncReducer(initialState, action)).toEqual({ [payload.modelName]: payload.func })
	});
});

describe('isOpenModelModalReducer', () => {
	const initialState = false;
	const action = { type: actions.TOGGLE_CREATE_MODEL_MODAL, };

	it('should return model modal initialState', () => {
		expect(isOpenModelModalReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce model modal state', () => {
		expect(isOpenModelModalReducer(initialState, action)).toEqual(!initialState)
	});
});

describe('modelModalFormReducer', () => {
	const initialState = {};
	const payload = { form: 'form' };
	const action = {
		type: actions.SET_MODEL_MODAL_FORM,
		payload
	};

	it('should return model modal initialState', () => {
		expect(modelModalFormReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce model modal state', () => {
		expect(modelModalFormReducer(initialState, action)).toEqual(payload)
	});
});

describe('crudParamsReducer', () => {
	const initialState = {};
	const payload = { modelName: 'ModelName' };
	const action = {
		type: actions.SET_CRUD_PARAMS,
		payload
	};

	it('should return params initial state', () => {
		expect(crudParamsReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce params state', () => {
		expect(crudParamsReducer(initialState, action)).toEqual({ [payload.modelName]: payload })
	});
});

describe('crudCreateModalLoadingReducer', () => {
	const initialState = false;

	it('should return params initial state', () => {
		expect(crudCreateModalLoadingReducer(initialState, {})).toEqual(initialState)
	});

	it('should reduce create model start state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + START })).toEqual(true);
	});

	it('should reduce change model start state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + START })).toEqual(true);
	});

	it('should reduce create model success state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + SUCCESS })).toEqual(false);
	});
	it('should reduce change model success state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + SUCCESS })).toEqual(false);
	});
	it('should reduce create model error state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CREATE_MODEL + ERROR })).toEqual(false);
	});
	it('should reduce change model error state', () => {
		expect(crudCreateModalLoadingReducer(initialState, { type: actions.CHANGE_MODEL + ERROR })).toEqual(false);
	});
});

describe('actions', () => {
	const
		id = 'id',
		url = 'url',
		modelName = 'Modelname',
		action = 'action',
		initialValues = {},
		modalType = 'typeModal',
		params = {},
		filters = {},
		func = () => {},
		query = 'query',
		filter = 'filter',
		form = {};

	it('toggleCreateModelModal', () => {
		expect(actions.toggleCreateModelModal()).toEqual({ type: actions.TOGGLE_CREATE_MODEL_MODAL })
	});

	it('deleteModel', () => {
		expect(actions.deleteModel(id, url, modelName)).toEqual({
			type: actions.DELETE_MODEL,
			payload: {
				id, url, modelName
			}
		})
	});

	it('restoreModel', () => {
		expect(actions.restoreModel(id, url, modelName)).toEqual({
			type: actions.RESTORE_MODEL,
			payload: {
				id, url, modelName
			}
		})
	});

	it('createModel', () => {
		expect(actions.createModel(form, url, modelName)).toEqual({
			type: actions.CREATE_MODEL,
			payload: {
				form, url, modelName
			}
		})
	});

	it('changeModel', () => {
		expect(actions.changeModel(form, action, modelName)).toEqual({
			type: actions.CHANGE_MODEL,
			payload: {
				form, action, modelName
			}
		})
	});

	it('setModelModalForm', () => {
		expect(actions.setModelModalForm(modalType, initialValues, action)).toEqual({
			type: actions.SET_MODEL_MODAL_FORM,
			payload: {
				modalType, initialValues, action
			}
		})
	});

	it('setCrudActionsFunc', () => {
		expect(actions.setCrudActionsFunc(func, modelName)).toEqual({
			type: actions.SET_CRUD_ACTIONS_FUNC, payload: { func, modelName }
		})
	});

	it('setCrudParams', () => {
		expect(actions.setCrudParams(params)).toEqual({
			type: actions.SET_CRUD_PARAMS, payload: params
		})
	});

	it('fetchCrudModels', () => {
		expect(actions.fetchCrudModels(params, filters)).toEqual({
			type: actions.FETCH_CRUD_MODELS, payload: { params, filters }
		})
	});
	it('fetchCrudFilterValues', () => {
		expect(actions.fetchCrudFilterValues(modelName, filter, query)).toEqual({
			type: actions.FETCH_CRUD_FILTER_VALUES,
			payload: {
				query, filter, modelName
			}
		})
	});
});

describe('delete model saga', () => {
	const deleteAction = {
		type: actions.DELETE_MODEL,
		payload: {url: 'url'}
	};
	it('should dispatch request action DELETE_MODEL', () => {
		expect(deleteModelSaga(deleteAction).next().value).toEqual(put(request({
			...deleteAction,
			method: 'POST',
			auth: true,
			url: `${deleteAction.payload.url}`,
			payload: deleteAction.payload
		})))
	})
});

describe('restore model saga', () => {
	const restoreAction = {
		type: actions.RESTORE_MODEL,
		payload: {url: 'url'}
	};
	it('should dispatch request action RESTORE_MODEL', () => {
		expect(restoreModelSaga(restoreAction).next().value).toEqual(put(request({
			...restoreAction,
			method: 'POST',
			auth: true,
			url: `${restoreAction.payload.url}`,
			payload: restoreAction.payload
		})))
	})
});

describe('close Modal saga', () => {
	const generator = closeModalSaga();
	it('should dispatch TOGGLE_CREATE_MODAL action', () => {
		expect(generator.next().value).toEqual(put(actions.toggleCreateModelModal()))
	});

	it('should dispatch SET_MODEL_MODAL_FORM action', () => {
		expect(generator.next().value).toEqual(put(actions.setModelModalForm(null, null)))
	});
});

describe('submitModelsModalFormFailSaga', () => {
	const action = {
		error: { message: 'error', targetField: 'field' },
	};
	const errors = { [action.error.targetField || 'name']: action.error.message };
	const generator = submitModelsModalFormFailSaga(action);

	it('should return errors', () => {
		expect(generator.next().value).toEqual(errors)
	});

	it('should stop submit', () => {
		expect(generator.next().value).toEqual(put(stopSubmit('createModel', errors)))
	});

	it('should invoke notification', () => {
		expect(generator.next().value).toEqual(notification('error', action.error.message))
	});
});


describe('notifySaga', () => {
	const actionError = {
		error: { message: 'error' }
	};
	const actionSuccess = {
		response: {
			status: SUCCESS_REQ,
			message: 'message'
		}
	};
	const generatorError = notifySaga(actionError);
	const generatorSuccess = notifySaga(actionSuccess);

	it('should invoke error notification', () => {
		expect(generatorError.next().value).toEqual(notification('error', actionError.error.message))
	});

	it('should invoke success notification', () => {
		expect(generatorSuccess.next().value).toEqual(notification('success', actionSuccess.response.message))
	});
});

describe('fetchCrudFilterValuesSaga', () => {
	const action = {
		type: actions.FETCH_CRUD_FILTER_VALUES,
		payload: { query: 'query' }
	};
	it('should dispatch request action RESTORE_MODEL', () => {
		expect(fetchCrudFilterValuesSaga(action).next().value).toEqual(put(request({
			...action,
			method: 'GET',
			auth: true,
			url: `${action.payload.query}`
		})))
	})
});

describe('createModelSaga', () => {
	const action = {
		type: actions.CREATE_MODEL,
		payload: {
			modelName: 'ModelName',
			form: {},
			action: {}
		}

	};

	const gen = createModelSaga(action);

	it('should select params', () => {
		expect(gen.next().value).toEqual(select(selectCrudParams));
	});

	it('should dispatch request action CREATE_MODEL', () => {
		expect(gen.next(createParams).value).toEqual(put(request({
			...action,
			method: 'POST',
			auth: true,
			url: `${action.payload.action.url}`,
			payload: createParams[action.payload.modelName].submitShape(action.payload.form),
			modelName: action.payload.modelName
		})))
	})
});

const action = {
	type: actions.CREATE_MODEL,
	payload: {
		modelName: 'ModelName',
		form: {},
		action: {}
	}

};

const createParams = { ModelName: {
	submitShape: () => {}
}};
describe('createModelSaga', () => {
	const gen = createModelSaga(action);

	it('should select params', () => {
		expect(gen.next().value).toEqual(select(selectCrudParams));
	});

	it('should dispatch request action CREATE_MODEL', () => {
		expect(gen.next(createParams).value).toEqual(put(request({
			...action,
			method: 'POST',
			auth: true,
			url: `${action.payload.action.url}`,
			payload: createParams[action.payload.modelName].submitShape(action.payload.form),
			modelName: action.payload.modelName
		})))
	})
});

describe('changeModelSaga', () => {
	const changeAction = {...action, type: actions.CHANGE_MODEL};
	const gen = changeModelSaga(changeAction);

	it('should select params', () => {
		expect(gen.next().value).toEqual(select(selectCrudParams));
	});

	it('should dispatch request action CHANGE_MODEL', () => {
		expect(gen.next(createParams).value).toEqual(put(request({
			...changeAction,
			method: 'POST',
			auth: true,
			url: `${changeAction.payload.action.url}`,
			payload: createParams[changeAction.payload.modelName].submitShape(changeAction.payload.form),
			modelName: changeAction.payload.modelName
		})))
	})
});

describe('updateModelsSaga', () => {
	const updateAction = {
		payload: { name: 'name' },
		modelName: 'model'
	};
	const gen = updateModelsSaga(updateAction);
	const params = { model: {
		modelName: 'ModelName',
		crudRead: 'url'
	}};

	it('should select params', () => {
		expect(gen.next().value).toEqual(select(selectCrudParams));
	});

	it('should dispatch fetch action', () => {
		expect(gen.next(params).value).toEqual(put(actions.fetchCrudModels({
			modelName: params.model.modelName, url: params.model.crudRead
		})));
	});
});

describe('fetchCrudModelsSuccessSaga', () => {
	const payload = {
		params: { modelName: 'ModelName' }
	};
	const response = {
		data: {
			columns: [
				{
					filter: {
						query: 'query',
						can: true
					},
					id: 'id',
				}
			]
		}
	};
	const fetchSuccessAction = { payload, response };

	it('should dispatch request actions for fetching filters', () => {
		expect(fetchCrudModelsSuccessSaga(fetchSuccessAction).next().value).toEqual(
			put(actions.fetchCrudFilterValues(payload.params.modelName, 'id', 'query'))
		)
	})
});

