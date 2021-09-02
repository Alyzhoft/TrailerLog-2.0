import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
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
	height: 'calc(100vh - 8.75rem)',
};
const verticalSpots = Array.from({ length: 35 }, (_, index) => index + 1);
const horizontalSpots = Array.from({ length: 48 }, (_, index) => index + 1);
const horizontalSpots2 = Array.from({ length: 4 }, (_, index) => index + 1);

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
	const [doors, setDoors] = useState([]);

	return (
		<div style={screenHeight} className="flex w-full overflow-y-auto">
			{addOpen ? (
				<AddModal
					open={addOpen}
					close={() => setAddOpen(false)}
					spotNumber={spotClicked}
					trailerLocation={TrailerLocation.RVAC}
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
			<div className=" w-1/12 h-full mt-10">
				{verticalSpots.map((i) => {
					return (
						<VerticalSpot
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
				<div className=" flex flex-col justify-between w-full h-1/2 ">
					<div className=" w-full h-1/4 flex space-x-1">
						{horizontalSpots.map((i) => {
							return (
								<HorizontalSpot
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
					<div className=" w-full h-1/4 flex space-x-1">
						{horizontalSpots.map((i) => {
							return (
								<HorizontalSpot
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
				<div className=" flex flex-col justify-between w-full h-4/5 mt-10">
					<div className=" w-full h-1/4 flex space-x-1">
						{horizontalSpots.map((i) => {
							return (
								<HorizontalSpot
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

					<div className=" w-full h-1/4 flex justify-end pr-10 space-x-1">
						{horizontalSpots2.map((i) => {
							return (
								<HorizontalSpot
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

			<div className="w-1/12 h-full ml-5 mt-10">
				{verticalSpots.map((i) => {
					return (
						<VerticalSpot
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
