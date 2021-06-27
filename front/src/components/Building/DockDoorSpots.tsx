import React, { useState } from 'react';
import { trailer } from '../../types';
import AddModal from '../Modals/AddModal';

type Trailer = {
	door: number;
	trailers: trailer[];
};

export default function DockDoorSpot({ door, trailers }: Trailer) {
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(true);
	}

	return (
		<>
			{open ? <AddModal open={open} close={() => setOpen(false)} spotNumber={door} /> : <></>}
			<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				{trailers.map((trailer) => {
					return parseInt(trailer.spotNumber) === door ? (
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black" onClick={handleClick}>
							{trailer.trailerNumber}
						</button>
					) : (
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black h-full w-full" onClick={handleClick}></button>
					);
				})}
				{/* <button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black" onClick={handleClick}>
					{door}
				</button> */}
			</div>
		</>
	);
}
