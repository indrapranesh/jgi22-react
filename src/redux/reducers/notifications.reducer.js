import { SET_NOTIFICATIONS } from '../actions/action-types';

const initialState = {
	notifications: {}
};

const notifications = (state = initialState, action) => {
	switch (action.type) {
	case SET_NOTIFICATIONS:
		return Object.assign({},
			action.payload);
	default:
		return state;
	}
};

export default notifications;