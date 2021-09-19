import React, { useContext, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import clsx from 'clsx';
import { Trailer, TrailerLocation } from '../../types';
import { CategoryContext } from '../../utils/context';

type Props = {
	spot: any;
	spotOrientation?: 'Top' | 'Bottom';
	lot: TrailerLocation;
	trailers: Trailer[];
	spotClicked: (spot: any) => void;
	trailerClicked: (trailer: Trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function LotSpot({
	spot,
	spotOrientation = 'Top',
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
				parseInt(trailer.Spots.name) === parseInt(spot.name) && trailer.Spots.lotId === 2,
		) !== undefined
	) {
		const trailer = trailers.find(
			(trailer) =>
				parseInt(trailer.Spots.name) === parseInt(spot.name) && trailer.Spots.lotId === 2,
		);

		if (trailer !== undefined) {
			return (
				<div className="flex flex-col justify-center items-center">
					{spotOrientation === 'Top' ? (
						<div className={clsx(' text-2xs font-bold')}>{spot.name}</div>
					) : null}

					<div className="flex space-x-1 w-4 h-20 bg-white rounded-md justify-center text-center shadow-md border-gray-600 border-2">
						<button
							data-tip={trailer.comments}
							// style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
							className={classNames(
								'focus:outline-none w-full rounded flex justify-center items-center',
								`bg-${getColor(trailer)}`,
								`text-${getFontColor(trailer)}`,
							)}
							onClick={() => handleEditClick(trailer)}
						>
							<span className="upRight text-2xs font-bold">{trailer?.trailerNumber}</span>
						</button>
					</div>
					{spotOrientation === 'Bottom' ? (
						<div className="text-2xs font-bold">{spot.name}</div>
					) : null}
					{trailer.comments !== '' ? <ReactTooltip place="top" type="dark" effect="solid" /> : null}
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col justify-center items-center">
			{spotOrientation === 'Top' ? (
				<div className={clsx(' text-2xs font-bold')}>{spot.name}</div>
			) : null}
			<div className="flex w-4 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button
					className="text-black h-full w-full flex justify-center items-center focus:outline-none text-xs"
					onClick={handleAddClick}
				>
					<span style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}></span>
				</button>
			</div>
			{spotOrientation === 'Bottom' ? <div className="text-2xs font-bold">{spot.name}</div> : null}
		</div>
	);
}
