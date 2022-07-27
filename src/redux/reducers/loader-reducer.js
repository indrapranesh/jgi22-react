import { SET_LOADING } from '../actions/action-types';

const initialState = {
	loading: false
};

const loader = (state = initialState, action) => {
	switch (action.type) {
	case SET_LOADING:
		return Object.assign({},
			action.payload);
	default:
		return state;
	}
};

export default loader;