import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Router } from '@reach/router';
import { SocketContext } from './socket';
import { getTrailers } from './utils/api';
import RVAC from './Views/RVAC';
import RMAN from './Views/RMAN';
import Requests from './Views/Requests';
import Container from './components/ui/Container';

function App() {
	const [trailers, setTrailers] = useState([]);
	//REST
	useEffect(() => {
		const fetchData = async () => {
			const trailers = await getTrailers();
			console.log(trailers);
			setTrailers(trailers);
		};
		fetchData();
	}, []);

	//Socket
	const socket = useContext(SocketContext);

	socket.on('returnTrailerAdded', (trailer) => {
		setTrailers(trailer.trailers);
	});

	return (
		<div className="App flex flex-col h-screen justify-between">
			<Navbar />
			<Container>
				<Router>
					<RVAC trailers={trailers} path="/" />
					<RMAN trailers={trailers} path="/rman" />
					<Requests path="/requests" />
				</Router>
			</Container>
		</div>
	);
}

export default App;
