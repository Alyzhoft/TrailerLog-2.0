import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/socket';
import { CarrierContext, CategoryContext } from '../../utils/context';
import { trailer } from '../../types';
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
	trailer: trailer | null;
	close: () => void;
	trailers: trailer[];
};

const options = ['E-Track', 'Reinforced', 'Not Reinforced', 'TPOD'];

export default function TempModal({ open, close, spotNumber = 1, trailer, trailerLocation = TrailerLocation.RVAC, trailers }: Props) {
	const [trailerId, setTrailerId] = useState<number>();
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [trailerOptions, setTrailerOptions] = useState<(string | undefined)[]>([]);
	const [specialOptions, setSpecialOptions] = useState<(string | undefined)[]>([]);
	const [carrier, setCarrier] = useState(carrierOptions[0]);
	const [urgent, setUrgent] = useState(false);
	const [trailerNumber, setTrailerNumber] = useState(trailerOptions[0]);
	const [trailerNumberToggle, setTrailerNumberToggle] = useState(false);
	const [specialToggle, setSpecialToggle] = useState(false);
	const [special, setSpecial] = useState(specialOptions[0]);

	const socket = useContext(SocketContext);
	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

	useEffect(() => {
		const temp = carriers.map((carrier: any) => {
			return carrier.carrierName;
		});
		setCarrierOptions(temp.sort());
		setCarrier(temp.sort()[0]);
	}, [carriers]);

	useEffect(() => {
		let arr = trailers.map((trailer) => (trailer.carrier === carrier && trailer.trailerLocation !== 'RVAC' && trailer.trailerLocation !== 'RMAN' ? trailer?.trailerNumber : undefined));
		setTrailerOptions(arr);
		setTrailerNumber(trailerNumberToggle ? arr.find((a) => a !== undefined) : undefined);
	}, [trailerNumberToggle, trailers, carrier]);

	useEffect(() => {
		const trailer = trailers.find((t) => t.trailerNumber === trailerNumber && t.carrier === carrier);
		if (trailer !== undefined) {
			setTrailerId(trailer.id);
		}
	}, [trailerNumber, carrier, trailers]);

	useEffect(() => {
		setSpecialOptions(options);
		setSpecial(options[0]);
	}, []);

	return (
		<>
			{carrierOptions.length ? (
				<Transition show={open} as={Fragment}>
					<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" static open={open} onClose={close}>
						<div className="min-h-screen px-4 text-center">
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
								<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span className="inline-block h-screen align-middle" aria-hidden="true">
								&#8203;
							</span>
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
								<div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<Dialog.Title as="h3" className=" text-5xl font-bold font-large leading-6 text-gray-900">
										{`Dock: ${spotNumber}`}
									</Dialog.Title>

									<form
										onSubmit={(e) => {
											e.preventDefault();

											console.log({ trailerId, trailerNumber, carrier, urgent, special, trailerLocation, spotNumber });

											socket.emit('inRequest', { trailerId, inTrailerNumber: trailerNumber, inCarrier: carrier, urgent, special, inTrailerLocation: trailerLocation, inSpotNumber: spotNumber });

											close();
										}}
									>
										<div className="w-full mx-1 mt-3">
											<ComboBox labelName={'Carrier'} options={carrierOptions} value={carrier} valueChange={(value) => setCarrier(value)} />
										</div>
										{trailerNumberToggle ? (
											<div className="w-full mx-1 mt-3">
												<ComboBox labelName={'Trailer Number'} options={trailerOptions} value={trailerNumber} valueChange={(value) => setTrailerNumber(value)} />
											</div>
										) : null}
										{specialToggle ? (
											<div className="w-full mx-1 mt-3">
												<ComboBox labelName={'Special'} options={specialOptions} value={special} valueChange={(value) => setSpecial(value)} />
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
											<div className="flex justify-center ml-2">
												<Toggle enabled={urgent} setEnabled={() => setUrgent(!urgent)} label="Urgent" />
												<Toggle enabled={specialToggle} setEnabled={() => setSpecialToggle(!specialToggle)} label="Special" classes="ml-2" />
												<Toggle enabled={trailerNumberToggle} setEnabled={() => setTrailerNumberToggle(!trailerNumberToggle)} label="Trailer Number" classes="ml-2" />
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
