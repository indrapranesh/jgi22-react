import { combineReducers } from 'redux';
import session from './session-reducer';
import loader from './loader-reducer';
import integration from './integration-reducer';
import categories from './categories.redcuer';

export default combineReducers({
	session,
	loader,
	integration,
	categories
});