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
			<div className="flex mx-4 h-8">
				{doors.map((door: number) => {
					return <DockDoorNumber door={door} />;
				})}
			</div>
			<div className="flex mb-4 mx-4 h-28 border-black border-2">
				{trailers.map((trailer: number) => {
					return <DockDoorSpots trailerNumber={trailer} />;
				})}
			</div>
		</div>
	);
}
