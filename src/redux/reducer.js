import actions from './actions'
import {ERROR, SORT_DESC, SUCCESS, START} from "../../../constants";

export const crudModelsReducer = (state = {}, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.FETCH_CRUD_MODELS + SUCCESS:
			return {...state, [payload.params.modelName]: response};
		case actions.FETCH_CRUD_MODELS + ERROR:
			return {
				...state,
				[payload.params.modelName]: {
					...state[payload.params.modelName],
					loading: false,
					error
				}
			};
		case actions.FETCH_CRUD_MODELS + START:
			return {
				...state,
				[payload.params.modelName]: {
					...state[payload.params.modelName],
					loading: true
				}
			};
		default:
			return state;
	}
};

export const crudFilterValuesReducer = (state = {}, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.FETCH_CRUD_FILTER_VALUES + SUCCESS:
			return {
				...state,
				loading: false,
				[payload.modelName]: {
					...state[payload.modelName],
					[payload.filter]: response.data,
				}
			};
		case actions.FETCH_CRUD_FILTER_VALUES + ERROR:
			return {...state, loading: false, error};
		case actions.FETCH_CRUD_FILTER_VALUES + START:
			return {...state, loading: true};
		default:
			return state;
	}
};

export const crudActionsFuncReducer = (state = null, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.SET_CRUD_ACTIONS_FUNC:
			return {
				...state,
				[payload.modelName]: payload.func
			};
		default:
			return state;
	}
};


export const isOpenModelModalReducer = (state = false, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.TOGGLE_CREATE_MODEL_MODAL:
			return !state;
		default:
			return state;
	}
};

export const modelModalFormReducer = (state = {}, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.SET_MODEL_MODAL_FORM:
			return payload;
		default:
			return state;
	}
};

export const crudParamsReducer = (state = {}, action) => {
	const {type, response, error, payload} = action;

	switch(type) {
		case actions.SET_CRUD_PARAMS:
			return {
				...state,
				[payload.modelName]: payload
			};
		default:
			return state;
	}
};

export default {
	crudFilterValues: crudFilterValuesReducer,
	crudModels: crudModelsReducer,
	crudActionsFunc: crudActionsFuncReducer,
	isOpenModelModal: isOpenModelModalReducer,
	modelModalForm: modelModalFormReducer,
	crudParams: crudParamsReducer
}