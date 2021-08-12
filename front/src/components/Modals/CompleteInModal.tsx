import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/socket';
import { trailer, Request } from '../../types';
import Button from '../ui/Button';
import ComboBox from '../ui/ComboBox';

type Props = {
	open: boolean;
	close: () => void;
	trailers: trailer[];
	request: Request;
};

const options = ['E-Track', 'Reinforced', 'Not Reinforced', 'TPOD'];

export default function TempModal({ open, close, request, trailers }: Props) {
	const [trailerId, setTrailerId] = useState<number>();
	const [trailerOptions, setTrailerOptions] = useState<(string | undefined)[]>([]);
	const [trailerNumber, setTrailerNumber] = useState(trailerOptions[0]);

	const socket = useContext(SocketContext);

	useEffect(() => {
		let arr = trailers.map((trailer) =>
			trailer.carrier === request.inCarrier &&
			trailer.trailerLocation !== 'RVAC' &&
			trailer.trailerLocation !== 'RMAN'
				? trailer?.trailerNumber
				: undefined,
		);
		setTrailerNumber(arr.find((a) => a !== undefined));
		setTrailerOptions(arr);
	}, [trailers, request.inCarrier]);

	useEffect(() => {
		console.log('CALLED');

		const trailer = trailers.find(
			(t) => t.trailerNumber === trailerNumber && t.carrier === request.inCarrier,
		);
		if (trailer !== undefined) {
			setTrailerId(trailer.id);
		}
	}, [trailerNumber, trailers, request.inCarrier]);

	console.log({ trailerNumber, trailerId });

	return (
		<>
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
								<Dialog.Title
									as="h3"
									className=" text-3xl font-bold font-large leading-6 text-gray-900"
								>
									Select a Trailer
								</Dialog.Title>

								<form
									onSubmit={(e) => {
										e.preventDefault();

										const temp = { ...request };

										if (trailerId) {
											temp.trailerId = trailerId;
										}

										if (trailerNumber) {
											temp.inTrailerNumber = trailerNumber;
										}

										console.log({
											temp,
										});

										socket.emit('complete', temp);

										close();
									}}
								>
									<div className="w-full mx-1 mt-3">
										<ComboBox
											labelName={'Carrier'}
											options={trailerOptions}
											value={trailerNumber}
											valueChange={(value) => setTrailerNumber(value)}
										/>
									</div>
									<div className="mt-4 flex">
										<div className="ml-2">
											<Button type="submit">Submit</Button>
										</div>
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
		</>
	);
}
