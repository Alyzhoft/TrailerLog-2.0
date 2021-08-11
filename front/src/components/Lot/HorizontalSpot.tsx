import React from 'react';

export default function HorizontalSpot() {
	return (
		<div>
			<div className="ml-1">1</div>
			<div className="flex mr-1 w-4 h-16 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button
					style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}
					className="text-black h-full w-full focus:outline-none ml-1 text-xs"
				>
					12345
				</button>
			</div>
		</div>
	);
}
