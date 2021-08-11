import React from 'react';
import { RouteComponentProps } from '@reach/router';
import VerticalSpot from '../components/Lot/VerticalSpot';
import HorizontalSpot from '../components/Lot/HorizontalSpot';

type Props = RouteComponentProps;

const screenHeight = {
	height: 'calc(100vh - 8.75rem)',
};
const verticalSpots = Array.from({ length: 35 }, (_, index) => index + 1);
const horizontalSpots = Array.from({ length: 48 }, (_, index) => index + 1);
const horizontalSpots2 = Array.from({ length: 4 }, (_, index) => index + 1);

export default function PrimaryLot({ path }: Props) {
	return (
		<div style={screenHeight} className="flex w-full overflow-y-auto">
			<div className=" w-1/12 h-full">
				{verticalSpots.map(() => {
					return <VerticalSpot />;
				})}
			</div>

			<div className="w-full h-screen">
				<div className=" flex flex-col justify-between w-full h-1/2 ">
					<div className=" w-full h-1/4 flex">
						{horizontalSpots.map((i) => {
							return <HorizontalSpot />;
						})}
					</div>
					<div className=" w-full h-1/4 flex">
						{horizontalSpots.map((i) => {
							return <HorizontalSpot />;
						})}
					</div>
				</div>
				<div className=" flex flex-col justify-between w-full h-1/2 ">
					<div className=" w-full h-1/4 flex">
						{horizontalSpots.map((i) => {
							return <HorizontalSpot />;
						})}
					</div>

					<div className=" w-full h-1/4 flex justify-end pr-10">
						{horizontalSpots2.map((i) => {
							return <HorizontalSpot />;
						})}
					</div>
				</div>
			</div>

			<div className="w-1/12 h-full ">
				{verticalSpots.map(() => {
					return <VerticalSpot />;
				})}
			</div>
		</div>
	);
}
