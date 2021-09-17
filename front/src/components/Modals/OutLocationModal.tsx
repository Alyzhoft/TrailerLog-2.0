import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import ComboBox from '../ui/ComboBox';
import Button from '../ui/Button';
import { getAvalibleTrailerLocations } from '../../utils/api';
import { Requests, Spots } from '../../types';
import { socket } from '../../utils/socket';

enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

type Props = {
	open: boolean;
	close: () => void;
	request: Requests;
};

export default function OutLocation({
	open,
	close,
	request,
}: // spotNumber,
// trailerLocation,
Props) {
	const [trailerLocations, setTrailerLocations] = useState<any>();
	const [newTrailerLocation, setNewTrailerLocation] = useState<any>('Secondary');
	const [spot, setSpot] = useState('1');
	const [trailerLocationsOptions, setTrailerLocationsOptions] = useState<any[]>([]);
	const [newLocationOptions, setNewLocationOptions] = useState<any>({
		Secondary: ['1'],
	});

	useEffect(() => {
		const fetchData = async () => {
			const res = await getAvalibleTrailerLocations();
			setTrailerLocations(res);
		};
		fetchData();
	}, []);

	useEffect(() => {
		// //REWORK THE BELOW CODE BUT IT WILL WORK FOR NOW
		const temp: any = [];
		if (trailerLocations) {
			for (let i = 0; i < trailerLocations.length; i++) {
				const spots: Spots = trailerLocations[i].Spots;
				temp.push([trailerLocations[i].name, spots]);
			}

			setTrailerLocationsOptions(temp.map((t: any) => t[0]));
			setNewLocationOptions(Object.fromEntries(temp));
		}
	}, [trailerLocations]);

	return (
		<>
			{newLocationOptions[newTrailerLocation] !== undefined ? (
				<Transition show={open} as={Fragment}>
					<Dialog
						as="div"
						className="fixed z-10 inset-0 overflow-y-auto"
						static
						open={open}
						onClose={close}
					>
						<div className="min-h-screen px-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span className="inline-block h-screen align-middle" aria-hidden="true">
								&#8203;
							</span>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<Dialog.Title as="h3" className=" text-2xl font-large leading-6 text-gray-900">
										Out Location
									</Dialog.Title>

									<form
										onSubmit={(e) => {
											e.preventDefault();
											let lot: any;
											if (newTrailerLocation === 'Primary Lot') {
												lot = TrailerLocation.PRIMARY;
											} else {
												lot = TrailerLocation.SECONDARY;
											}
											request.inTrailerLocation = lot;
											request.inSpotNumber = spot.split(',')[0];
											request.spotId = parseInt(spot.split(',')[1]);

											console.log(spot[1]);

											console.log({
												newTrailerLocation,
												spot,
												request,
											});

											socket.emit('complete', request);
											close();
										}}
									>
										<div className=" md:flex justify-between">
											<div className="w-full mx-1 mt-3">
												<ComboBox
													labelName={'New Trailer Location'}
													options={trailerLocationsOptions}
													value={newTrailerLocation}
													valueChange={(value) => {
														setNewTrailerLocation(value);
													}}
												/>
											</div>
											<div className="w-full mx-1 mt-3">
												<ComboBox
													labelName={'New Trailer Location'}
													options={newLocationOptions[newTrailerLocation]}
													value={spot}
													spots={true}
													valueChange={(value) => setSpot(value)}
												/>
											</div>
										</div>
										<div className="mt-4 flex">
											<Button type="submit">Move</Button>
											<div className="ml-2">
												<Button variant="danger" close={close}>
													Close
												</Button>
											</div>
										</div>
									</form>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			) : (
				<div></div>
			)}
		</>
	);
}
