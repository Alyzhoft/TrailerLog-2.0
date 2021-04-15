import React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps, Router } from '@reach/router';
import './index.css';
import Home from './Views/Home';
import Navbar from './components/Navbar/Navbar';

let HomeRoute = (props: RouteComponentProps) => <Home />;

ReactDOM.render(
	<React.StrictMode>
		<Navbar />
		<Router>
			<HomeRoute path="/" />
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
