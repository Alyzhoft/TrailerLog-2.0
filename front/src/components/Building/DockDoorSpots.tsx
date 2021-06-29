import React, { useState } from 'react';
import { trailer, TrailerLocation } from '../../types';
import AddModal from '../Modals/AddModal';
import EditModal from '../Modals/EditModal';

type Trailer = {
	door: number;
	dock: TrailerLocation;
	trailers: trailer[];
};

export default function DockDoorSpot({ door, trailers, dock }: Trailer) {
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [trailer, setTrailer] = useState(trailers[1]);

	function handleAddClick() {
		setAddOpen(true);
	}

	function handleEditClick(trailer: trailer) {
		setTrailer(trailer);
		setEditOpen(true);
	}

	return (
		<>
			{addOpen ? <AddModal open={addOpen} close={() => setAddOpen(false)} spotNumber={door} trailerLocation={dock} /> : <></>}
			{editOpen ? <EditModal open={editOpen} close={() => setEditOpen(false)} trailer={trailer} spotNumber={door} trailerLocation={dock} /> : <></>}
			<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				{trailers.map((trailer) => {
					return parseInt(trailer.spotNumber) === door && trailer.trailerLocation === dock ? (
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black focus:outline-none" onClick={() => handleEditClick(trailer)}>
							{trailer.trailerNumber}
						</button>
					) : (
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black h-full w-full focus:outline-none" onClick={handleAddClick}></button>
					);
				})}
			</div>
		</>
	);
}
