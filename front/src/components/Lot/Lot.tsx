import React from 'react';
import { trailer, TrailerLocation } from '../../types';
import LotSpot from './LotSpot';

type LotProps = {
	spots: number[];
	lot: TrailerLocation;
	trailers: trailer[];
	spotClicked: (spot: any) => void;
	addOpen: () => void;
};

export default function Lot({ spots, lot, trailers, addOpen, spotClicked }: LotProps) {
	return (
		<div>
			<div className="flex flex-wrap mx-4">
				{spots.map((spot: number) => {
					return <LotSpot key={spot} spot={spot} lot={lot} trailers={trailers} spotClicked={(spot) => spotClicked(spot)} addOpen={addOpen} />;
				})}
			</div>
		</div>
	);
}
