import React, { useContext, useEffect, useState } from 'react';
import { trailer, TrailerLocation } from '../../types';
import { CategoryContext } from '../../utils/context';
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
	const [categoriesOptions, setCategoriesOptions] = useState<{ categoryName: string; color: string }[]>([]);

	const categories = useContext(CategoryContext);

	useEffect(() => {
		const temp = categories.map((category: any) => {
			return { categoryName: category.categoryName, color: category.color };
		});

		setCategoriesOptions(temp.sort());
	}, [categories]);

	function getColor(trailer: trailer) {
		const [category] = categoriesOptions.filter((c) => c.categoryName === trailer.category);
		return category !== undefined ? category.color : 'blue-100';
	}

	function handleAddClick() {
		setAddOpen(true);
	}

	function handleEditClick(trailer: trailer) {
		setTrailer(trailer);
		setEditOpen(true);
	}

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ');
	}

	if (trailers.find((trailer) => parseInt(trailer.spotNumber) === door && trailer.trailerLocation === dock) !== undefined) {
		const trailer = trailers.find((trailer) => parseInt(trailer.spotNumber) === door && trailer.trailerLocation === dock);
		if (trailer !== undefined) {
			return (
				<>
					{editOpen ? <EditModal open={editOpen} close={() => setEditOpen(false)} trailer={trailer} spotNumber={door} trailerLocation={dock} /> : <></>}
					<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className={classNames('text-black focus:outline-none w-full', `bg-${getColor(trailer)} rounded w-full h-full`)} onClick={() => handleEditClick(trailer)}>
							{trailer?.trailerNumber}
						</button>
					</div>
				</>
			);
		}
	}

	return (
		<>
			<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="text-black h-full w-full focus:outline-none" onClick={handleAddClick}></button>
			</div>
		</>
	);
}
