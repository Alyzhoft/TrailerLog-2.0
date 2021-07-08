import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Lot from '../components/Lot/Lot';
import Building from '../components/Building/Building';
import { trailer, TrailerLocation } from '../types';
import AddModal from '../components/Modals/AddModal';
import EditModal from '../components/Modals/EditModal';
import TempModal from '../components/Modals/TempModal';
import LotMoveModal from '../components/Modals/LotMoveModal';
import AddInModal from '../components/Modals/AddInModal';
import InModal from '../components/Modals/InModal';
import { TrailerLocationContext } from '../utils/context';

const screenHeight = {
	height: 'calc(100vh - 5.75rem)',
};

type Props = RouteComponentProps & {
	trailers: trailer[];
};

// const doors = Array.from({ length: 50 }, (_, index) => index + 1);
// const trailers = Array.from({ length: 50 }, (_, index) => index + 1);

export default function RVAC({ trailers }: Props) {
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [lotModal, setLotModal] = useState(false);
	const [addIn, setAddIn] = useState(false);
	const [inModal, setInModal] = useState(false);
	const [spotClicked, setSpotClicked] = useState<any>(0);
	const [selctedTrailer, setSelectedTrailer] = useState<trailer | null>(null);
	const [doors, setDoors] = useState([]);

	const trailerLocations = useContext(TrailerLocationContext);

	useEffect(() => {
		for (let i = 0; i < trailerLocations.length; i++) {
			if (trailerLocations[i].name === 'RVAC') {
				setDoors(trailerLocations[i].Spots);
			}
		}
	}, [trailerLocations]);

	return (
		<div style={screenHeight} className="flex flex-col justify-between h-screen mt-5">
			{addOpen ? <AddModal open={addOpen} close={() => setAddOpen(false)} spotNumber={spotClicked} trailerLocation={TrailerLocation.RVAC} /> : null}
			{editOpen ? <EditModal open={editOpen} close={() => setEditOpen(false)} trailer={selctedTrailer} trailerLocation={TrailerLocation.RVAC} /> : <></>}
			{lotModal ? <LotMoveModal open={lotModal} close={() => setLotModal(false)} spotNumber={spotClicked.name} trailer={selctedTrailer} /> : null}
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
			{inModal ? <InModal open={inModal} close={() => setInModal(false)} trailer={selctedTrailer} spotNumber={spotClicked.name} trailers={trailers} /> : null}
			{/* Do not remove the below div */}
			<div></div>
			<div className="hidden building:block">
				<Building dock={'RVAC'} doors={doors} trailers={trailers} spotClicked={(door) => setSpotClicked(door)} trailerClicked={(trailer: trailer) => setSelectedTrailer(trailer)} addOpen={() => setAddIn(true)} tempModal={() => setEditOpen(true)} />
			</div>
			<div className="building:hidden w-full h-full mt-5 ">
				<h1 className="text-4xl font-bold">RVAC</h1>
				<div className="border-black border-t-2">
					<Lot spots={doors} lot={TrailerLocation.RVAC} trailers={trailers} trailerClicked={(trailer: trailer) => setSelectedTrailer(trailer)} spotClicked={(spot) => setSpotClicked(spot)} addOpen={() => setAddOpen(true)} tempModal={() => setAddIn(true)} />
				</div>
			</div>
		</div>
	);
}
