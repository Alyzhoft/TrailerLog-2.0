import React from 'react';
import LotSpot from './LotSpot';

type LotProps = {
	spots: number[];
};

export default function Lot({ spots }: LotProps) {
	return (
		<div className="">
			<div className="flex flex-wrap mx-4">
				{spots.map((spot: number) => {
					return <LotSpot key={spot} spot={spot} />;
				})}
			</div>
		</div>
	);
}
