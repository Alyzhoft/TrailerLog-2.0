import React from 'react';
import DockDoorNumber from './DockDoorNumber';
import DockDoorSpots from './DockDoorSpots';

type BuildingProps = {
	doors: number[];
	trailers: number[];
};

export default function Building({ doors, trailers }: BuildingProps) {
	return (
		<div className="mb-5">
			<div className="flex justify-between mx-4 h-28">
				{doors.map((doors: number) => {
					return <DockDoorSpots key={doors} trailerLocation={doors} />;
				})}
			</div>
			<div className="flex justify-between mb-4 mx-4 h-10 border-black border-2 shadow-md">
				{doors.map((door: number) => {
					return <DockDoorNumber key={door} door={door} />;
				})}
			</div>
		</div>
	);
}
