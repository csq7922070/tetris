import {combineReducers} from 'redux';

import list, {loadArticles} from '../components/home/preview-list-redux';

export default combineReducers({
	list
});

export const actions = {
	loadArticles
};