import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { trailer } from '../../types';
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
	spotNumber?: number;
	trailerLocation?: TrailerLocation;
	trailer: trailer | null;
	close: () => void;
};

export default function TempModal({ open, editOpen, lotMove, close, spotNumber = 1, trailer, trailerLocation = TrailerLocation.RVAC }: Props) {
	console.log(trailer);
	return (
		<>
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
										<div className="ml-2">
											<Button onClick={lotMove}>Move</Button>
										</div>
										<div className="ml-2">
											<Button close={close}>Depart</Button>
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
