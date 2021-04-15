import React from 'react';

type Trailer = {
	trailerNumber: number;
};

export default function DockDoorNumber({ trailerNumber }: Trailer) {
	return (
		<div className="flex ml-2 w-full h-18 bg-blue-600 rounded-md justify-center">
			<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-white">
				{trailerNumber}
			</button>
		</div>
	);
}
