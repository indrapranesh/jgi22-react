import { combineReducers } from 'redux';
import session from './session-reducer';
import loader from './loader-reducer';
import integration from './integration-reducer';

export default combineReducers({
	session,
	loader,
	integration
});