import React, { useState } from 'react';
import AddModal from '../Modals/AddModal';

type Trailer = {
	trailerNumber: number;
};

export default function DockDoorNumber({ trailerNumber }: Trailer) {
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(true);
	}

	return (
		<>
			<AddModal open={open} close={() => setOpen(false)} />
			<div className="flex mx-1 w-full h-24 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-white" onClick={handleClick}>
					{trailerNumber}
				</button>
			</div>
		</>
	);
}
