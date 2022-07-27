import { SET_LOGIN } from '../actions/action-types';

const initialState = {
    isLoggedIn: false
};

const session = (state = initialState, action) => {
	switch (action.type) {
	case SET_LOGIN:
		return Object.assign({},
			action.payload);
	default:
		return state;
	}
};

export default session;