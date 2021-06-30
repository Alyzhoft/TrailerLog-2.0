import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Router } from '@reach/router';
import { SocketContext } from './utils/socket';
import { CarrierContext, CategoryContext } from './utils/context';
import { getCarriers, getCategories, getTrailers } from './utils/api';
import RVAC from './Views/RVAC';
import RMAN from './Views/RMAN';
import Requests from './Views/Requests';
import Container from './components/ui/Container';

function App() {
	const [trailers, setTrailers] = useState([]);
	const [carriers, setCarriers] = useState([]);
	const [categories, setCategories] = useState([]);
	//REST
	useEffect(() => {
		const fetchData = async () => {
			const trailers = await getTrailers();
			const carriers = await getCarriers();
			const categories = await getCategories();
			console.log({ trailers, carriers, categories });
			setTrailers(trailers);
			setCarriers(carriers);
			setCategories(categories);
		};
		fetchData();
	}, []);

	//Socket
	const io = useContext(SocketContext);

	io.connect();

	io.on('returnTrailerAdded', (trailer) => {
		setTrailers(trailer.trailers);
	});

	io.on('returnTrailerDeleted', (trailer) => {
		setTrailers(trailer.trailers);
	});

	io.on('returnTrailerUpdated', (trailer) => {
		setTrailers(trailer.trailers);
	});

	return (
		<div className="App flex flex-col h-screen justify-between">
			<Navbar />
			<CategoryContext.Provider value={categories}>
				<CarrierContext.Provider value={carriers}>
					<Container>
						<Router>
							<RVAC trailers={trailers} path="/" />
							<RMAN trailers={trailers} path="/rman" />
							<Requests path="/requests" />
						</Router>
					</Container>
				</CarrierContext.Provider>
			</CategoryContext.Provider>
		</div>
	);
}

export default App;
