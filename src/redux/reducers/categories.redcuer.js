import { SET_CATEGORIES } from '../actions/action-types';

const initialState = {
	category: {}
};

const categories = (state = initialState, action) => {
	switch (action.type) {
	case SET_CATEGORIES:
		return Object.assign({},
			action.payload);
	default:
		return state;
	}
};

export default categories;