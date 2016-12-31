import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './redux/configure-store';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';
import routes from './routes/index';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render((
	<Provider store={store}>
		{routes(history)}
	</Provider>
), document.getElementById('root'));