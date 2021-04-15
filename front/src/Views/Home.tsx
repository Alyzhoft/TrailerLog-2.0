import React from 'react';
import Building from '../components/Building/Building';

const screenHeight = {
	height: 'calc(100vh - 4.25rem)',
};

const doors = Array.from({ length: 50 }, (_, index) => index + 1);
const trailers = Array.from({ length: 50 }, (_, index) => index + 1);

function Home() {
	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen">
			<div className="bg-red-300 h-full">Test</div>
			<Building doors={doors} trailers={trailers} />
		</div>
	);
}

export default Home;
