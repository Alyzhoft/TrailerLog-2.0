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
	// const [trailers, setTrailers] = useState([]);
	// const [carriers, setCarriers] = useState([]);
	// const [categories, setCategories] = useState([]);

	const [data, setData] = useState({ trailers: [], carriers: [], categories: [] });

	//REST
	useEffect(() => {
		const fetchData = async () => {
			const trailers = await getTrailers();
			const carriers = await getCarriers();
			const categories = await getCategories();

			setData({
				trailers,
				carriers,
				categories,
			});
		};
		fetchData();
	}, []);

	const io = useContext(SocketContext);

	useEffect(() => {
		io.on('returnTrailerAdded', (trailer) => {
			setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
		});
	}, [io]);

	useEffect(() => {
		io.on('returnTrailerDeleted', (trailer) => {
			setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
		});
	}, [io]);

	useEffect(() => {
		io.on('returnTrailerUpdated', (trailer) => {
			setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
		});
	}, [io]);

	console.log(data);

	return (
		<div className="App flex flex-col h-screen justify-between">
			<Navbar />
			<CategoryContext.Provider value={data.categories}>
				<CarrierContext.Provider value={data.carriers}>
					<Container>
						<Router>
							<RVAC trailers={data.trailers} path="/" />
							<RMAN trailers={data.trailers} path="/rman" />
							<Requests path="/requests" />
						</Router>
					</Container>
				</CarrierContext.Provider>
			</CategoryContext.Provider>
		</div>
	);
}

export default App;
