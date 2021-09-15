import React, { useContext, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { trailer, TrailerLocation } from '../../types';
import { CategoryContext } from '../../utils/context';

type Props = {
	spot: any;
	lot: TrailerLocation;
	trailers: trailer[];
	spotClicked: (spot: any) => void;
	trailerClicked: (trailer: trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function LotSpot({
	spot,
	trailers,
	lot,
	spotClicked,
	addOpen,
	tempModal,
	trailerClicked,
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

	function getColor(trailer: trailer) {
		const [category] = categoriesOptions.filter((c) => c.categoryName === trailer.category);
		return category !== undefined ? category.color : 'blue-100';
	}

	function handleAddClick() {
		spotClicked(spot);
		addOpen();
	}

	function handleEditClick(trailer: trailer) {
		tempModal();
		trailerClicked(trailer);
	}

	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ');
	}

	if (
		trailers.find(
			(trailer) =>
				parseInt(trailer.spotNumber) === parseInt(spot.name) && trailer.trailerLocation === lot,
		) !== undefined
	) {
		const trailer = trailers.find(
			(trailer) =>
				parseInt(trailer.spotNumber) === parseInt(spot.name) && trailer.trailerLocation === lot,
		);

		if (trailer !== undefined) {
			return (
				<div className="flex justify-center space-x-1 items-center">
					<span className="text-xs">{spot.name}</span>

					<div className="flex w-14 h-4 bg-white rounded-md justify-center items-center shadow-md border-gray-600 border-2">
						<button
							data-tip={trailer.comments}
							// style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
							className={classNames(
								'text-black h-full w-full rounded flex justify-center items-center text-xs focus:outline-none',
								`bg-${getColor(trailer)}`,
							)}
							onClick={() => handleEditClick(trailer)}
						>
							<span>{trailer?.trailerNumber}</span>
						</button>
					</div>
					{trailer.comments !== '' ? <ReactTooltip place="top" type="dark" effect="solid" /> : null}
				</div>
			);
		}
	}

	return (
		<div className="flex justify-center space-x-1 items-center">
			<span className="text-2xs font-bold">{spot.name}</span>
			<div className="flex w-14 h-4 bg-white rounded-md justify-center items-center shadow-md border-gray-600 border-2">
				<button
					className="text-black h-full w-full mb-1 text-xs focus:outline-none"
					onClick={handleAddClick}
				>
					<span></span>
				</button>
			</div>
		</div>
	);
}
