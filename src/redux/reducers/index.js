import { combineReducers } from 'redux';
import session from './session-reducer';
import loader from './loader-reducer';

export default combineReducers({
	session,
	loader
});