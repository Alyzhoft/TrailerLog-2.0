import React from 'react';
import { RouteComponentProps } from '@reach/router';
import VerticalSpot from '../components/Lot/VerticalSpot';
import HorizontalSpot from '../components/Lot/HorizontalSpot';

type Props = RouteComponentProps;

const screenHeight = {
	height: 'calc(100vh - 8.75rem)',
};
const verticalSpots = Array.from({ length: 17 }, (_, index) => index + 1);
const horizontalSpots = Array.from({ length: 37 }, (_, index) => index + 1);

export default function PrimaryLot({ path }: Props) {
	return (
		<div style={screenHeight}>
			<div className=" w-full h-1/2 flex">
				<div className=" w-1/12 h-full">
					{verticalSpots.map(() => {
						return <VerticalSpot />;
					})}
				</div>
				<div className="w-full h-full flex flex-col justify-between items-center mb-2">
					<div className=" w-full h-1/4 flex">
						{horizontalSpots.map((i) => {
							return <HorizontalSpot />;
						})}
					</div>
					<div className=" w-full h-1/4 flex">
						{' '}
						{horizontalSpots.map(() => {
							return <HorizontalSpot />;
						})}
					</div>
				</div>
				<div className=" w-1/12 h-full ">
					{verticalSpots.map(() => {
						return <VerticalSpot />;
					})}
				</div>
			</div>
			<div className=" w-full h-1/2 flex">
				<div className=" w-1/12 h-full ">
					{verticalSpots.map(() => {
						return <VerticalSpot />;
					})}
				</div>
				<div className="w-full h-full flex flex-col justify-between items-center mt-2">
					<div className=" w-full h-1/4 flex">
						{horizontalSpots.map(() => {
							return <HorizontalSpot />;
						})}
					</div>
				</div>
				<div className=" w-1/12 h-full ">
					{verticalSpots.map(() => {
						return <VerticalSpot />;
					})}
				</div>
			</div>
		</div>
	);
}
