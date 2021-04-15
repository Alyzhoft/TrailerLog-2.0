import React from 'react';

type LotProps = {
	spots: number[];
};

export default function Lot({ spots }: LotProps) {
	return (
		<div className=" bg-red-300 h-full">
			<div className="flex flex-wrap">
				{spots.map((spot: number) => {
					return (
						<div>
							<div className="ml-4 font-bold">{spot}</div>
							<button style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }} className="w-8 h-20 mx-2 mt-2 rounded-md bg-blue-500">
								{spot}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
