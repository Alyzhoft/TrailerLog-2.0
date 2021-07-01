import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Lot from '../components/Lot/Lot';
import Building from '../components/Building/Building';
import { trailer, TrailerLocation } from '../types';
import AddModal from '../components/Modals/AddModal';

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

type Props = RouteComponentProps & {
	trailers: trailer[];
};

const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// const trailers = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RVAC({ trailers }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [spotClicked, setSpotClicked] = useState<number>(0);

	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen mt-5">
			{addOpen ? <AddModal open={addOpen} close={() => setAddOpen(false)} spotNumber={spotClicked} trailerLocation={TrailerLocation.SECONDARY} /> : <></>}
			<div></div>
			<div className="hidden building:block">
				<Building dock={TrailerLocation.RVAC} doors={doors} trailers={trailers} />
			</div>
			<div className="building:hidden w-full h-full mt-5 ">
				<h1 className="text-4xl font-bold">RVAC</h1>
				<div className="border-black border-t-2">
					<Lot spots={doors} lot={TrailerLocation.RVAC} trailers={trailers} spotClicked={(spot) => setSpotClicked(spot)} addOpen={() => setAddOpen(true)} />
				</div>
			</div>
		</div>
	);
}
