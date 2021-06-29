import React from 'react';
import DockDoorNumber from './DockDoorNumber';
import DockDoorSpots from './DockDoorSpots';
import { trailer, TrailerLocation } from '../../types';

type BuildingProps = {
	doors: number[];
	trailers: trailer[];
	dock: TrailerLocation;
};

export default function Building({ doors, dock, trailers, ...props }: BuildingProps) {
	return (
		<div className="mb-5" {...props}>
			<div className="flex justify-between mx-4 h-28">
				{doors.map((door: number) => {
					return <DockDoorSpots key={door} trailers={trailers} dock={dock} door={door} />;
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
