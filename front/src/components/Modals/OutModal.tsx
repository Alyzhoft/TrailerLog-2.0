import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/socket';
import { CarrierContext, CategoryContext } from '../../utils/context';
import { Trailer } from '../../types';
import Button from '../ui/Button';
import ComboBox from '../ui/ComboBox';
import Toggle from '../ui/Toggle';

enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

type Props = {
	open: boolean;
	spotNumber?: any;
	trailerLocation?: TrailerLocation;
	trailer: Trailer | null;
	close: () => void;
	trailers: Trailer[];
};

const options = ['E-Track', 'Reinforced', 'Not Reinforced', 'TPOD'];

export default function TempModal({
	open,
	close,
	spotNumber = 1,
	trailer,
	trailerLocation = TrailerLocation.RVAC,
	trailers,
}: Props) {
	const [inTrailerId, setInTrailerId] = useState<number>();
	const [outTrailerId, setOutTrailerId] = useState<number>();
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [trailerOptions, setTrailerOptions] = useState<(string | undefined)[]>([]);
	const [specialOptions, setSpecialOptions] = useState<(string | undefined)[]>([]);
	const [categoriesOptions, setCategoriesOptions] = useState<(string | undefined)[]>([]);
	const [carrier, setCarrier] = useState(carrierOptions[0]);
	const [urgent, setUrgent] = useState(false);
	const [inRequest, setInRequest] = useState(false);
	const [inTrailerNumber, setInTrailerNumber] = useState(trailerOptions[0]);
	const [currentSpotId, setCurrentSpotId] = useState<number>();
	const [outTrailerNumber, setOutTrailerNumber] = useState<string>();
	const [category, setCategory] = useState(categoriesOptions[0]);
	const [categoryToggle, setCategoryToggle] = useState(false);
	const [special, setSpecial] = useState(specialOptions[0]);

	const socket = useContext(SocketContext);
	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

	useEffect(() => {
		const temp = carriers.map((carrier: any) => {
			return carrier.carrierName;
		});
		setCarrierOptions(temp.sort());
		// setCarrier(temp.sort()[0]);
	}, [carriers]);

	useEffect(() => {
		const temp = categories.map((category: any) => {
			return category.categoryName;
		});

		setCategoriesOptions(temp.sort());
		setCategory(temp.sort()[0]);
	}, [categories]);

	useEffect(() => {
		if (trailer) {
			setOutTrailerId(trailer.id);
			setOutTrailerNumber(trailer.trailerNumber);
		}
	}, [trailer]);

	useEffect(() => {
		let arr = trailers.map((trailer) =>
			trailer.carrier === carrier &&
			trailer.trailerLocation !== 'RVAC' &&
			trailer.trailerLocation !== 'RMAN'
				? trailer?.trailerNumber
				: undefined,
		);
		console.log(arr);

		setTrailerOptions(arr);
		console.log(arr.find((a) => a !== undefined));

		setInTrailerNumber(inRequest ? arr.find((a) => a !== undefined) : undefined);
	}, [inRequest, trailers, carrier]);

	useEffect(() => {
		const trailer = trailers.find(
			(t) => t.trailerNumber === inTrailerNumber && t.carrier === carrier,
		);
		if (trailer !== undefined) {
			setInTrailerId(trailer.id);
			setCurrentSpotId(trailer.Spots.id);
		}
	}, [inTrailerNumber, carrier, trailers]);

	useEffect(() => {
		setSpecialOptions(options);
		setSpecial(options[0]);
	}, []);

	return (
		<>
			{carrierOptions.length ? (
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
								<div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<Dialog.Title
										as="h3"
										className=" text-5xl font-bold font-large leading-6 text-gray-900"
									>
										Out Request
									</Dialog.Title>

									<div className="mt-5 text-4xl">{`Dock: ${spotNumber}`}</div>
									<form
										onSubmit={(e) => {
											e.preventDefault();

											console.log({
												outTrailerId,
												inTrailerId,
												outTrailerNumber,
												inTrailerNumber,
												carrier,
												urgent,
												special,
												trailerLocation,
												spotNumber,
											});

											inRequest
												? socket.emit('addRequest', {
														inTrailerId: inTrailerId,
														outTrailerId: outTrailerId,
														inTrailerNumber: inTrailerNumber,
														outTrailerNumber: outTrailerNumber,
														inCarrier: carrier,
														urgent,
														special,
														inTrailerLocation: trailerLocation,
														inSpotNumber: spotNumber,
														outCarrier: trailer?.carrier,
														outTrailerLocation: trailer?.trailerLocation,
														outSpotNumber: trailer?.spotNumber,
														spotId: currentSpotId,
												  })
												: socket.emit('addRequest', {
														outTrailerId: outTrailerId,
														outTrailerNumber: outTrailerNumber,
														urgent,
														special,
														outCarrier: trailer?.carrier,
														outTrailerLocation: trailer?.trailerLocation,
														outSpotNumber: trailer?.spotNumber,
												  });

											// socket.emit('addRequest', { inTrailerId: inTrailerId, outTrailerId: outTrailerId, inTrailerNumber: inTrailerNumber, outTrailerNumber: outTrailerNumber, inCarrier: carrier, urgent, special, inTrailerLocation: trailerLocation, inSpotNumber: spotNumber, outCarrier: trailer?.carrier, outTrailerLocation: trailer?.trailerLocation, outSpotNumber: trailer?.spotNumber });

											close();
										}}
									>
										{inRequest ? (
											<div className="flex w-full mx-1 mt-3 space-x-1">
												<div className="w-1/2">
													<ComboBox
														labelName={'Carrier'}
														options={carrierOptions}
														value={carrier}
														defaultValue={'Select a Carrier'}
														valueChange={(value) => setCarrier(value)}
													/>
												</div>
												<div className="ml-1 w-1/2">
													<ComboBox
														labelName={'Trailer Number'}
														options={trailerOptions}
														defaultValue={'Select a Trailer Number'}
														value={inTrailerNumber}
														valueChange={(value) => setInTrailerNumber(value)}
													/>
												</div>
											</div>
										) : null}
										{categoryToggle ? (
											<div className="w-full mx-1 mt-3">
												<ComboBox
													labelName={'Category'}
													options={categoriesOptions}
													value={category}
													valueChange={(value) => setCategory(value)}
												/>
											</div>
										) : null}
										<div className="mt-4 flex">
											<div className="ml-2">
												<Button type="submit">Submit</Button>
											</div>
											<div className="ml-2">
												<Button variant="danger" close={close}>
													Close
												</Button>
											</div>
											<div className="flex justify-center ml-2 space-x-1">
												<Toggle
													enabled={inRequest}
													setEnabled={() => setInRequest(!inRequest)}
													label="In Request"
												/>
												<Toggle
													enabled={urgent}
													setEnabled={() => setUrgent(!urgent)}
													label="Urgent"
												/>
												<Toggle
													enabled={categoryToggle}
													setEnabled={() => setCategoryToggle(!categoryToggle)}
													label="Category Change"
													classes="ml-2"
												/>
											</div>
										</div>
									</form>
								</div>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			) : null}
		</>
	);
}
