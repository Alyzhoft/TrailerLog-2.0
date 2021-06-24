import React, { useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import Navbar from './components/Navbar/Navbar';
import { RouteComponentProps, Router } from '@reach/router';
import RVAC from './Views/RVAC';
import RMAN from './Views/RMAN';
import Requests from './Views/Requests';

// import socket from './socket';

let RVACRoute = (props: RouteComponentProps) => <RVAC />;
let RMANRoute = (props: RouteComponentProps) => <RMAN />;
let RequestsRoute = (props: RouteComponentProps) => <Requests />;

function App() {
	return (
		<div className="App flex flex-col h-screen justify-between">
			<Navbar />
			<Router>
				<RVACRoute path="/" />
				<RMANRoute path="/rman" />
				<RequestsRoute path="/requests" />
			</Router>
		</div>
	);
}

export default App;
