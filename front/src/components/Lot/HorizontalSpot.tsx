import React from 'react';

export default function HorizontalSpot() {
	return (
		<div>
			<div className="ml-3 font-bold"></div>
			<div className="flex m-1 w-8 h-28 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button
					style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}
					className="text-black h-full w-full focus:outline-none"
				></button>
			</div>
		</div>
	);
}
