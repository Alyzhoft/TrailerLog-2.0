import React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps, Router } from '@reach/router';
import './index.css';
import RVAC from './Views/RVAC';
import Navbar from './components/Navbar/Navbar';
import RMAN from './Views/RMAN';
import Requests from './Views/Requests';

let RVACRoute = (props: RouteComponentProps) => <RVAC />;
let RMANRoute = (props: RouteComponentProps) => <RMAN />;
let RequestsRoute = (props: RouteComponentProps) => <Requests />;

ReactDOM.render(
	<React.StrictMode>
		<Navbar />
		<Router>
			<RVACRoute path="/" />
			<RMANRoute path="/rman" />
			<RequestsRoute path="/requests" />
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
