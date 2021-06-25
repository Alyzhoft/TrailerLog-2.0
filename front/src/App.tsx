import React, { useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import { RouteComponentProps, Router } from '@reach/router';
import { SocketContext } from './socket';
import RVAC from './Views/RVAC';
import RMAN from './Views/RMAN';
import Requests from './Views/Requests';
import Container from './components/ui/Container';

// import socket from './socket';

let RVACRoute = (props: RouteComponentProps) => <RVAC />;
let RMANRoute = (props: RouteComponentProps) => <RMAN />;
let RequestsRoute = (props: RouteComponentProps) => <Requests />;

function App() {
	const socket = useContext(SocketContext);

	socket.on('returnTrailerAdded', (trailer) => {
		console.log(trailer);
	});

	return (
		<div className="App flex flex-col h-screen justify-between">
			<Navbar />
			<Container>
				<Router>
					<RVACRoute path="/" />
					<RMANRoute path="/rman" />
					<RequestsRoute path="/requests" />
				</Router>
			</Container>
		</div>
	);
}

export default App;
