import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Lot from '../components/Lot/Lot';
import Building from '../components/Building/Building';
import { trailer } from '../types';

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

type Props = RouteComponentProps & {
	trailers: trailer[];
};

const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// const trailers = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RVAC({ trailers }: Props) {
	console.log(trailers);

	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen mt-5">
			<div></div>
			<div className="hidden building:block">
				<Building doors={doors} trailers={trailers} />
			</div>
			<div className="building:hidden w-full h-full mt-5 ">
				<h1 className="text-4xl font-bold">RVAC</h1>
				<div className="border-black border-t-2">
					<Lot spots={doors} />
				</div>
			</div>
		</div>
	);
}
