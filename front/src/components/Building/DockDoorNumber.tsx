import React from 'react';

type dockDoorProp = {
	door: number;
};

export default function DockDoorNumber({ door }: dockDoorProp) {
	return (
		<div className="flex ml-4 w-full items-start justify-between">
			<div className="font-bold">{door}</div>
		</div>
	);
}
