import React, { useEffect } from 'react';
import { useState } from 'react';

type Props = {
	setColor?: (currentColor: string) => void;
	open: (open: boolean) => void;
};

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
const variants = [100, 200, 300, 400, 500, 600, 700, 800, 900];

export default function ColorPicker({ setColor, open }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentColor, setCurrentColor] = useState('red-800');
	const [iconColor, setIconColor] = useState('text-white');

	function selectColor(color: string, variant: number) {
		setCurrentColor(`${color}-${variant}`);
		if (variant < 500) {
			setIconColor('text-black');
		} else {
			setIconColor('text-white');
		}
	}

	useEffect(() => {
		if (setColor) {
			setColor(currentColor);
		}
	}, [currentColor]);

	return (
		<div className="bg-white mx-auto my-auto p-4">
			<div>
				<label htmlFor="color-picker" className="block mb-1 font-semibold">
					Select a Color
				</label>
				<div className="flex flex-row relative">
					<input
						type="text"
						name="color-picker"
						id="color-picker"
						value={currentColor}
						className="border border-gray-400 p-2 rounded-lg"
					/>
					<div
						onClick={() => {
							open(!isOpen);
							setIsOpen(!isOpen);
						}}
						className={classNames(
							'rounded-full ml-3 my-auto h-10 w-10 flex justify-center items-center',
							`bg-${currentColor}`,
						)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="white"
							className={classNames('h-6 w-6 mx-auto my-auto" fill="none')}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
							/>
						</svg>
					</div>

					{isOpen ? (
						<div
							onClick={() => {
								open(false);
								setIsOpen(false);
							}}
							className="border bg-white border-gray-300 origin-top-right absolute right-0 top-full mt-2 rounded-md z-20 shadow-lg"
						>
							<div className="flex">
								{colors.map((color: string) => {
									return (
										<div>
											<div>
												{variants.map((variant: number) => {
													return (
														<div>
															<div
																onClick={() => selectColor(color, variant)}
																className={classNames(
																	'cursor-pointer w-6 h-6 rounded-full mx-1 my-1',
																	`bg-${color}-${variant}`,
																)}
															></div>
														</div>
													);
												})}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}
