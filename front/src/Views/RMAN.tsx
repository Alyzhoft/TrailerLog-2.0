import React from 'react';
import Lot from '../components/Lot/Lot';
import Building from '../components/Building/Building';

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

const doors = Array.from({ length: 50 }, (_, index) => index + 1);
const trailers = Array.from({ length: 50 }, (_, index) => index + 1);
const spots = Array.from({ length: 20 }, (_, index) => index + 1);

export default function RVAC() {
	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen mt-5">
			<Lot spots={spots} />
			<div className="hidden building:block">
				<Building doors={doors} trailers={trailers} />
			</div>
			<div className="building:hidden w-full h-full mt-5 ">
				<h1 className="text-4xl font-bold">RMAN</h1>
				<div className="border-black border-t-2">
					<Lot spots={trailers} />
				</div>
			</div>
		</div>
	);
}
