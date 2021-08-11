import React from 'react';

export default function HorizontalSpot() {
	return (
		<div>
			{/* <div className="ml-1"></div> */}
			<div className="flex mr-1 w-4 h-20 bg-white rounded-md justify-center shadow-md border-gray-600 border-2">
				<button className="text-black h-full w-full flex justify-center items-center focus:outline-none text-xs">
					<span style={{ textOrientation: 'upright', writingMode: 'vertical-rl' }}>12345</span>
				</button>
			</div>
		</div>
	);
}
