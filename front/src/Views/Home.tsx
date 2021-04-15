import React from 'react';
import Building from '../components/Building/Building';

const channelHeight = {
	height: 'calc(100vh - 4.25rem)',
};

function Home() {
	return (
		<div style={channelHeight} className="flex flex-col justify-between h-screen">
			<div className="bg-red-300 h-full">Test</div>
			<Building />
		</div>
	);
}

export default Home;
