import React from 'react';
import { trailer, TrailerLocation } from '../../types';
import LotSpot from './LotSpot';

type LotProps = {
	spots: number[];
	lot: TrailerLocation;
	trailers: trailer[];
	spotClicked: (spot: any) => void;
	trailerClicked: (trailer: trailer) => void;
	addOpen: () => void;
	tempModal: () => void;
};

export default function Lot({ spots, lot, trailers, addOpen, tempModal, spotClicked, trailerClicked }: LotProps) {
	return (
		<div>
			<div className="flex flex-wrap mx-4">
				{spots.map((spot: any) => {
					return <LotSpot key={spot.id} spot={spot} lot={lot} trailers={trailers} trailerClicked={(trailer) => trailerClicked(trailer)} spotClicked={(spot) => spotClicked(spot)} addOpen={addOpen} tempModal={tempModal} />;
				})}
			</div>
		</div>
	);
}
