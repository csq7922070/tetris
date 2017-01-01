import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './redux/configure-store';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browseHistory} from 'react-router';
import routes from './routes';
import DevTools from './redux/dev-tools';

const store = configureStore();
const history = syncHistoryWithStore(browseHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <div>
      {routes(history)}
      <DevTools />
    </div>
  </Provider>
), document.getElementById('root'));