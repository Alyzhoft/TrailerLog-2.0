import React, { useContext, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Trailer, TrailerLocation } from '../../types';
import { CategoryContext } from '../../utils/context';

type Props = {
	spot: any;
	lot: TrailerLocation;
	trailers: Trailer[];
	spotClicked: (spot: any) => void;
	trailerClicked: (trailer: Trailer) => void;
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
		spotClicked(spot);
		addOpen();
	}

	function handleEditClick(trailer: Trailer) {
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
				<div className="flex flex-col justify-center items-center">
					<div className="font-bold">{spot.name}</div>
					<div className="flex mx-1 w-6 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
						<button
							data-tip={trailer.id}
							data-for={trailer.id.toString()}
							// style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
							className={classNames(
								'focus:outline-none w-full rounded ',
								`bg-${getColor(trailer)}`,
								`text-${getFontColor(trailer)}`,
							)}
							onClick={() => handleEditClick(trailer)}
						>
							<span className="upRight text-2xs">{trailer?.trailerNumber}</span>
						</button>
					</div>

					<ReactTooltip id={trailer.id.toString()} place="top" type="dark" effect="solid">
						<div className="flex flex-col justify-center w-full">
							<h1 className="border-b border-white w-full">{trailer.carrier}</h1>
							<h1>{trailer.comments}</h1>
						</div>
					</ReactTooltip>
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="font-bold">{spot.name}</div>
			<div className="flex mx-1 w-6 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button
					style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}
					className="text-black h-full w-full focus:outline-none"
					onClick={handleAddClick}
				></button>
			</div>
		</div>
	);
}
