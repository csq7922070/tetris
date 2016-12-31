import {combineReducers} from 'redux';

import list from '../components/home/preview-list-redux';

export default combineReducers({
	list
});

export * as listAction from '../components/home/preview-list-redux';