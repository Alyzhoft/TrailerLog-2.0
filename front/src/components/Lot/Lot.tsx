import React from 'react';
import LotSpot from './LotSpot';

type LotProps = {
	spots: number[];
};

export default function Lot({ spots }: LotProps) {
	return (
		<div className=" bg-red-300 h-full">
			<div className="flex flex-wrap">
				{spots.map((spot: number) => {
					return <LotSpot spot={spot} />;
				})}
			</div>
		</div>
	);
}
