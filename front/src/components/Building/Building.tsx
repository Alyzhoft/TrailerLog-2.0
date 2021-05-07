import React from 'react';
import DockDoorNumber from './DockDoorNumber';
import DockDoorSpots from './DockDoorSpots';

type BuildingProps = {
	doors: number[];
	trailers: number[];
};

export default function Building({ doors, trailers }: BuildingProps) {
	return (
		<div>
			<div className="flex mx-4 h-24">
				{trailers.map((trailer: number) => {
					return <DockDoorSpots key={trailer} trailerNumber={trailer} />;
				})}
			</div>
			<div className="flex mb-4 mx-4 h-10 border-black border-2 shadow-md">
				{doors.map((door: number) => {
					return <DockDoorNumber key={door} door={door} />;
				})}
			</div>
		</div>
	);
}
