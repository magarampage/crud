import 'antd/dist/antd.css';
import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const AppWHO = lazy(() => import('./AppWHO'))
import { store } from './redux/store';

function LazyRoute(props) {
	const { component } = props
	return <Suspense fallback={<div />}>{component}</Suspense>
}

render(
	<div className="row">
		<Provider store={store}>
			<Router>
				<Suspense fallback={<div />}>
					<Switch>
						<Route
							path="/"
							exact
							render={props => (<AppWHO {...props} role="arbitrage" />)}
						/>
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	</div>
	,
	document.getElementById('root')
);
