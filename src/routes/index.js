import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Frame from '../layouts/frame';
import Home from '../views/home';
import Detail from '../views/detail';
import Tetris from '../views/tetris';

function routes(history){
	return (
		<Router history={history}>
			<Route path="/" component={Frame}>
				<IndexRoute component={Home} />
				<Route path="/detail/:id" component={Detail} />
				<Route path="/tetris" component={Tetris} />
			</Route>
		</Router>
	);
}

export default routes;