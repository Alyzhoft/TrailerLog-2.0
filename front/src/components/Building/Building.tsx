import React from 'react';
import DockDoorNumber from './DockDoorNumber';
import DockDoorSpots from './DockDoorSpots';
import { Trailer } from '../../types';

type BuildingProps = {
	doors: number[];
	trailers: Trailer[];
	dock: string;
	spotClicked: (door: any) => void;
	trailerClicked: (trailer: Trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function Building({
	doors,
	dock,
	trailers,
	spotClicked,
	trailerClicked,
	addOpen,
	tempModal,
	...props
}: BuildingProps) {
	//TODO: FIX NUMBER ISSUE LATER
	return (
		<div {...props}>
			<div className="flex justify-between h-20">
				{doors.map((door: any) => {
					return (
						<DockDoorSpots
							key={door.id}
							trailers={trailers}
							dock={dock}
							door={door}
							trailerClicked={(trailer) => trailerClicked(trailer)}
							spotClicked={(door) => spotClicked(door)}
							addOpen={addOpen}
							tempModal={tempModal}
						/>
					);
				})}
			</div>
			<div className="flex justify-between h-10 border-black border-2 shadow-md">
				{doors.map((door: any) => {
					return <DockDoorNumber key={door.id} door={door.name} />;
				})}
			</div>
		</div>
	);
}
