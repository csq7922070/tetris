import {combineReducers} from 'redux';

import list from '../components/home/preview-list-redux';

export default combineReducers({
	list
});

import * as listAction from '../components/home/preview-list-redux';
export {listAction};