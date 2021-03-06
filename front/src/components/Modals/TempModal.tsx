import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import { SocketContext } from '../../utils/socket';
import { Trailer } from '../../types';
import Button from '../ui/Button';

enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

type Props = {
	open: boolean;
	editOpen: () => void;
	lotMove: () => void;
	outModal: () => void;
	spotNumber?: number;
	trailerLocation?: TrailerLocation;
	trailer: Trailer | null;
	close: () => void;
	outRequest?: boolean;
};

export default function TempModal({
	open,
	editOpen,
	lotMove,
	close,
	outModal,
	spotNumber = 1,
	trailer,
	trailerLocation = TrailerLocation.RVAC,
	outRequest = true,
}: Props) {
	const socket = useContext(SocketContext);

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
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className=" text-5xl font-bold font-large leading-6 text-gray-900"
								>
									{trailer?.trailerNumber}
								</Dialog.Title>

								<div className="mt-5">
									<div>
										<span className="text-xl font-bold">Carrier: </span>
										<span className="text-xl">{trailer?.carrier}</span>
									</div>
									<div>
										<span className="text-xl font-bold">Category: </span>
										<span className="text-xl">{trailer?.category}</span>
									</div>
								</div>

								<form
									onSubmit={(e) => {
										e.preventDefault();
									}}
								>
									<div className="mt-4 flex">
										<Button onClick={editOpen} type="submit">
											Edit
										</Button>
										{outRequest ? (
											<div className="ml-2">
												<Button onClick={outModal}>Out</Button>
											</div>
										) : null}
										<div className="ml-2">
											<Button onClick={lotMove}>Move</Button>
										</div>
										<div className="ml-2">
											<Button
												onClick={() => {
													socket.emit('departed', trailer);
													close();
												}}
											>
												Depart
											</Button>
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
