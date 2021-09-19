import React, { useContext, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Trailer } from '../../types';
import { CategoryContext } from '../../utils/context';

type Props = {
	door: any;
	dock: string;
	trailers: Trailer[];
	spotClicked: (door: any) => void;
	trailerClicked: (trailer: Trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function DockDoorSpot({
	door,
	trailers,
	dock,
	spotClicked,
	trailerClicked,
	addOpen,
	tempModal,
}: Props) {
	const [categoriesOptions, setCategoriesOptions] = useState<
		{ categoryName: string; color: string }[]
	>([]);

	const categories = useContext(CategoryContext);

	useEffect(() => {
		const temp = categories.map((category: any) => {
			return { categoryName: category.categoryName, color: category.color };
		});

		setCategoriesOptions(temp.sort());
	}, [categories]);

	function getColor(trailer: Trailer) {
		const [category] = categoriesOptions.filter((c) => c.categoryName === trailer.category);
		return category !== undefined ? category.color : 'blue-100';
	}

	function getFontColor(trailer: Trailer) {
		const [category] = categoriesOptions.filter((c) => c.categoryName === trailer.category);
		// return category !== undefined ? category.color : 'blue-100';

		if (category) {
			const number = parseInt(category.color.split('-')[1]);
			console.log(typeof number);

			return number >= 500 ? 'white' : 'black';
		}
	}

	function handleAddClick() {
		spotClicked(door);
		addOpen();
	}

	function handleTempClick(trailer: Trailer) {
		trailerClicked(trailer);
		spotClicked(door);
		tempModal();
	}

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ');
	}

	if (
		trailers.find(
			(trailer) => trailer.spotNumber === door.name && trailer.trailerLocation === dock,
		) !== undefined
	) {
		const trailer = trailers.find(
			(trailer) => trailer.spotNumber === door.name && trailer.trailerLocation === dock,
		);
		if (trailer !== undefined) {
			return (
				<>
					<div className="flex ml-1 w-6 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
						<button
							data-tip={trailer.id}
							data-for={trailer.id.toString()}
							className={classNames(
								'text-black focus:outline-none w-full text-2xs font-bold',
								`bg-${getColor(trailer)} rounded h-full`,
								`text-${getFontColor(trailer)}`,
							)}
							onClick={() => handleTempClick(trailer)}
						>
							<span style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}>
								{trailer?.trailerNumber}
							</span>
						</button>
					</div>
					<ReactTooltip id={trailer.id.toString()} place="top" type="dark" effect="solid">
						<div className="flex flex-col justify-center w-full">
							<h1 className="border-b border-white w-full">{trailer.carrier}</h1>
							<h1>{trailer.comments}</h1>
						</div>
					</ReactTooltip>
				</>
			);
		}
	}

	return (
		<>
			<div className="flex ml-1 w-6 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button
					style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}
					className="text-black h-full w-full focus:outline-none"
					onClick={handleAddClick}
				></button>
			</div>
		</>
	);
}
