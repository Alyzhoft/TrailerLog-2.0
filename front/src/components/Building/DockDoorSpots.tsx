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
			<div className="flex ml-2 w-full h-18 bg-blue-600 rounded-md justify-center">
				<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-white" onClick={handleClick}>
					{trailerNumber}
				</button>
			</div>
		</>
	);
}
