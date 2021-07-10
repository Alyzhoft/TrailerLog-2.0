import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Lot from '../components/Lot/Lot';
import Building from '../components/Building/Building';
import { TrailerLocation, trailer } from '../types';
import AddModal from '../components/Modals/AddModal';
import TempModal from '../components/Modals/TempModal';
import EditModal from '../components/Modals/EditModal';
import { TrailerLocationContext } from '../utils/context';
import LotMoveModal from '../components/Modals/LotMoveModal';
import AddInModal from '../components/Modals/AddInModal';
import InModal from '../components/Modals/InModal';
import OutModal from '../components/Modals/OutModal';

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

type Props = RouteComponentProps & {
	trailers: trailer[];
};

// const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// // const trailers = Array.from({ length: 50 }, (_, index) => index + 1);
// const spots = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RMAN({ trailers }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [addIn, setAddIn] = useState(false);
	const [tempModal, setTempModal] = useState(false);
	const [lotModal, setLotModal] = useState(false);
	const [inModal, setInModal] = useState(false);
	const [outModal, setOutModal] = useState(false);
	const [spotClicked, setSpotClicked] = useState<any>(0);
	const [selctedTrailer, setSelectedTrailer] = useState<trailer | null>(null);
	const [trailerLocation, setTrailerLocation] = useState<TrailerLocation | null>(null);
	const [doors, setDoors] = useState([]);

	const trailerLocations = useContext(TrailerLocationContext);

	useEffect(() => {
		for (let i = 0; i < trailerLocations.length; i++) {
			if (trailerLocations[i].name === 'RMAN') {
				console.log(trailerLocations[i].Spots.sort());

				setDoors(trailerLocations[i].Spots.sort());
			}
		}
	}, [trailerLocations]);

	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen mt-5">
			{addOpen ? (
				<AddModal
					open={addOpen}
					close={() => setAddOpen(false)}
					spotNumber={spotClicked}
					trailerLocation={trailerLocation}
				/>
			) : null}
			{editOpen ? (
				<EditModal
					open={editOpen}
					close={() => setEditOpen(false)}
					trailer={selctedTrailer}
					trailerLocation={trailerLocation}
				/>
			) : (
				<></>
			)}
			{lotModal ? (
				<LotMoveModal
					open={lotModal}
					close={() => setLotModal(false)}
					spotNumber={spotClicked.name}
					trailer={selctedTrailer}
				/>
			) : null}
			{tempModal ? (
				<TempModal
					open={tempModal}
					close={() => setTempModal(false)}
					trailer={selctedTrailer}
					trailerLocation={TrailerLocation.RMAN}
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
			{addIn ? (
				<AddInModal
					open={addIn}
					close={() => setAddIn(false)}
					addOpen={() => {
						setAddIn(false);
						setTimeout(() => {
							setAddOpen(true);
						}, 10);
					}}
					inRequest={() => {
						setAddIn(false);
						setTimeout(() => {
							setInModal(true);
						}, 10);
					}}
				/>
			) : null}
			{inModal ? (
				<InModal
					open={inModal}
					close={() => setInModal(false)}
					trailer={selctedTrailer}
					spotNumber={spotClicked.name}
					trailers={trailers}
					trailerLocation={TrailerLocation.RMAN}
				/>
			) : null}
			{outModal ? (
				<OutModal
					open={outModal}
					close={() => setOutModal(false)}
					trailer={selctedTrailer}
					spotNumber={spotClicked.name}
					trailers={trailers}
					trailerLocation={TrailerLocation.RMAN}
				/>
			) : null}
			<Lot
				spots={doors}
				lot={TrailerLocation.SECONDARY}
				trailers={trailers}
				spotClicked={(spot) => setSpotClicked(spot)}
				trailerClicked={(trailer: trailer) => {
					setSelectedTrailer(trailer);
				}}
				addOpen={() => {
					setTrailerLocation(TrailerLocation.SECONDARY);
					setAddOpen(true);
				}}
				tempModal={() => setTempModal(true)}
			/>
			<div className="hidden building:block">
				<Building
					dock={TrailerLocation.RMAN}
					doors={doors}
					trailers={trailers}
					spotClicked={(door) => setSpotClicked(door)}
					trailerClicked={(trailer: trailer) => {
						setSelectedTrailer(trailer);
					}}
					addOpen={() => {
						setTrailerLocation(TrailerLocation.RMAN);
						setAddIn(true);
					}}
					tempModal={() => setTempModal(true)}
				/>
			</div>
			<div className="building:hidden w-full h-full mt-5 ">
				<h1 className="text-4xl font-bold">RMAN</h1>
				<div className="border-black border-t-2">
					<Lot
						spots={doors}
						lot={TrailerLocation.RMAN}
						trailers={trailers}
						trailerClicked={(trailer: trailer) => {
							setSelectedTrailer(trailer);
						}}
						spotClicked={(spot) => setSpotClicked(spot)}
						addOpen={() => {
							setTrailerLocation(TrailerLocation.SECONDARY);
							setAddOpen(true);
						}}
						tempModal={() => setTempModal(true)}
					/>
				</div>
			</div>
		</div>
	);
}
