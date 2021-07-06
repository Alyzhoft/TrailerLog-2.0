import React, { useContext, useEffect, useState } from 'react';
import { trailer } from '../../types';
import { CategoryContext } from '../../utils/context';

type Trailer = {
	door: any;
	dock: string;
	trailers: trailer[];
	spotClicked: (door: any) => void;
	trailerClicked: (trailer: trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function DockDoorSpot({ door, trailers, dock, spotClicked, trailerClicked, addOpen, tempModal }: Trailer) {
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
		spotClicked(door);
		addOpen();
	}

	function handleTempClick(trailer: trailer) {
		trailerClicked(trailer);
		tempModal();
	}

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ');
	}

	if (trailers.find((trailer) => parseInt(trailer.spotNumber) === parseInt(door.name) && trailer.trailerLocation === dock) !== undefined) {
		const trailer = trailers.find((trailer) => parseInt(trailer.spotNumber) === parseInt(door.name) && trailer.trailerLocation === dock);
		if (trailer !== undefined) {
			return (
				<>
					<div className="flex mx-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
						<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className={classNames('text-black focus:outline-none w-full', `bg-${getColor(trailer)} rounded w-full h-full`)} onClick={() => handleTempClick(trailer)}>
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
