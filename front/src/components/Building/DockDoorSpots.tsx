import React, { useState } from 'react';
import AddModal from '../Modals/AddModal';

type Trailer = {
	trailerLocation: number;
};

export default function DockDoorNumber({ trailerLocation }: Trailer) {
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(true);
	}

	return (
		<>
			{open ? <AddModal open={open} close={() => setOpen(false)} trailerLocation={trailerLocation} /> : <></>}
			<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-white" onClick={handleClick}>
					{trailerLocation}
				</button>
			</div>
		</>
	);
}
