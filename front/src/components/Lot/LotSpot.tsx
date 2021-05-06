import React, { useState } from 'react';
import AddModal from '../Modals/AddModal';

type lotSpotProp = {
	spot: number;
};

export default function LotSpot({ spot }: lotSpotProp) {
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(true);
	}

	return (
		<div>
			<AddModal open={open} close={() => setOpen(false)} />
			<div className="ml-4 font-bold">{spot}</div>
			<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="w-8 h-20 mx-2 mt-2 rounded-md bg-blue-500" onClick={handleClick}>
				{spot}
			</button>
		</div>
	);
}
