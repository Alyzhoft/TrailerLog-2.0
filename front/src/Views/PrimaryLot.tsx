import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { TrailerLocationContext } from '../utils/context';
import VerticalSpot from '../components/Lot/VerticalSpot';
import HorizontalSpot from '../components/Lot/HorizontalSpot';
import { trailer, TrailerLocation } from '../types';
import AddModal from '../components/Modals/AddModal';
import EditModal from '../components/Modals/EditModal';
import TempModal from '../components/Modals/TempModal';
import LotMoveModal from '../components/Modals/LotMoveModal';

type Props = RouteComponentProps & {
	trailers: trailer[];
};

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

export default function PrimaryLot({ path, trailers }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [tempModal, setTempModal] = useState(false);
	const [lotModal, setLotModal] = useState(false);
	const [outModal, setOutModal] = useState(false);
	const [addIn, setAddIn] = useState(false);
	const [inModal, setInModal] = useState(false);
	const [spotClicked, setSpotClicked] = useState<any>(0);
	const [selctedTrailer, setSelectedTrailer] = useState<trailer | null>(null);
	const [spots, setSpots] = useState<any>();

	const trailerLocations = useContext(TrailerLocationContext);

	useEffect(() => {
		for (let i = 0; i < trailerLocations.length; i++) {
			if (trailerLocations[i].name === 'Primary Lot') {
				// const tempSpots: any[] = trailerLocations[i].Lot.Spots;

				const tempSpots: any[] = [...trailerLocations[i].Lot.Spots];

				const bh = tempSpots.splice(0, 4);
				const rv = tempSpots.splice(0, 35).reverse();
				const th = tempSpots.splice(0, 50).reverse();
				const tmh = tempSpots.splice(0, 31);
				const bmh = tempSpots.splice(0, 31);
				const lv = tempSpots.splice(0, 24);

				setSpots({
					LotSpots: {
						bh,
						rv,
						th,
						tmh,
						bmh,
						lv,
					},
				});
			}
		}
	}, [trailerLocations]);

	if (spots && spots.LotSpots.bh.length > 0) {
		return (
			<div style={screenHeight} className="flex w-full overflow-y-auto">
				{addOpen ? (
					<AddModal
						open={addOpen}
						close={() => setAddOpen(false)}
						spotNumber={spotClicked}
						trailerLocation={TrailerLocation.PRIMARY}
					/>
				) : null}
				{editOpen ? (
					<EditModal
						open={editOpen}
						close={() => setEditOpen(false)}
						trailer={selctedTrailer}
						trailerLocation={TrailerLocation.PRIMARY}
					/>
				) : (
					<></>
				)}
				{tempModal ? (
					<TempModal
						open={tempModal}
						close={() => setTempModal(false)}
						trailer={selctedTrailer}
						trailerLocation={TrailerLocation.PRIMARY}
						outRequest={false}
						editOpen={() => {
							setTempModal(false);
							setTimeout(() => {
								setEditOpen(true);
							}, 10);
						}}
						lotMove={() => {
							setTempModal(false);
							setTimeout(() => {
								setLotModal(true);
							}, 10);
						}}
						outModal={() => {
							setTempModal(false);
							setTimeout(() => {
								setOutModal(true);
							}, 10);
						}}
					/>
				) : null}
				{lotModal ? (
					<LotMoveModal
						open={lotModal}
						close={() => setLotModal(false)}
						spotNumber={spotClicked.name}
						trailer={selctedTrailer}
					/>
				) : null}

				<div className=" flex flex-col justify-end items-end bg-green-500 w-1/12 h-full mt-10 space-y-1">
					{spots.LotSpots.lv.map((i: any, k: any) => {
						return (
							<VerticalSpot
								key={k}
								spot={i}
								trailers={trailers}
								lot={TrailerLocation.PRIMARY}
								spotClicked={(spot) => setSpotClicked(spot)}
								trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
								addOpen={() => setAddOpen(true)}
								tempModal={() => setTempModal(true)}
							/>
						);
					})}
				</div>

				<div className="w-full h-screen mt-5">
					<div className=" flex flex-col justify-between w-full h-1/2">
						<div className=" w-full h-1/4 flex justify-center space-x-1">
							{spots.LotSpots.th.map((i: any, k: any) => {
								return (
									<HorizontalSpot
										key={k}
										spot={i}
										trailers={trailers}
										lot={TrailerLocation.PRIMARY}
										spotClicked={(spot) => setSpotClicked(spot)}
										trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
										addOpen={() => setAddOpen(true)}
										tempModal={() => setTempModal(true)}
									/>
								);
							})}
						</div>

						<div className=" w-full h-1/2 justify-center flex space-x-1">
							{spots.LotSpots.tmh.map((i: any, k: any) => {
								return (
									<HorizontalSpot
										key={k}
										spot={i}
										trailers={trailers}
										lot={TrailerLocation.PRIMARY}
										spotClicked={(spot) => setSpotClicked(spot)}
										trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
										addOpen={() => setAddOpen(true)}
										tempModal={() => setTempModal(true)}
									/>
								);
							})}
						</div>
					</div>

					<div className=" flex flex-col justify-between w-full h-4/5">
						<div className=" w-full h-1/4 flex justify-center space-x-1">
							{spots.LotSpots.bmh.map((i: any, k: any) => {
								return (
									<HorizontalSpot
										key={k}
										spot={i}
										spotOrientation="Bottom"
										trailers={trailers}
										lot={TrailerLocation.PRIMARY}
										spotClicked={(spot) => setSpotClicked(spot)}
										trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
										addOpen={() => setAddOpen(true)}
										tempModal={() => setTempModal(true)}
									/>
								);
							})}
						</div>

						<div className=" w-full h-1/4 flex justify-end pr-10 space-x-1">
							{spots.LotSpots.bh.map((i: any, k: any) => {
								return (
									<HorizontalSpot
										key={k}
										spot={i}
										trailers={trailers}
										lot={TrailerLocation.PRIMARY}
										spotClicked={(spot) => setSpotClicked(spot)}
										trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
										addOpen={() => setAddOpen(true)}
										tempModal={() => setTempModal(true)}
									/>
								);
							})}
						</div>
					</div>
				</div>

				<div className="w-1/12 h-full space-y-1 ml-5 mt-10">
					{spots.LotSpots.rv.map((i: any, k: any) => {
						return (
							<VerticalSpot
								key={k}
								spot={i}
								trailers={trailers}
								lot={TrailerLocation.PRIMARY}
								spotClicked={(spot) => setSpotClicked(spot)}
								trailerClicked={(trailerClicked) => setSelectedTrailer(trailerClicked)}
								addOpen={() => setAddOpen(true)}
								tempModal={() => setTempModal(true)}
							/>
						);
					})}
				</div>
			</div>
		);
	}

	return <div className="flex justify-center items-center font-bold">Loading...</div>;
}
