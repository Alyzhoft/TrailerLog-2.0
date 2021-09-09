import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';

import Input from '../ui/Input';

import Button from '../ui/Button';
import { SocketContext } from '../../utils/socket';

type Props = {
	open: boolean;

	close: () => void;
};

export default function AddCarriersModal({ open, close }: Props) {
	const [carrierName, setCarrierName] = useState('');

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
							<div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title as="h3" className=" text-2xl font-large leading-6 text-gray-900">
									Add Carrier
								</Dialog.Title>

								<form
									onSubmit={(e) => {
										e.preventDefault();

										socket.emit('addCarrier', {
											carrierName,
										});
										close();
									}}
								>
									<div className="md:flex justify-between ">
										<div className="w-full mx-1 mt-3">
											<Input
												labelText="Carrier Name"
												placeholder="Carrier Name"
												value={carrierName}
												onChange={(e) => setCarrierName(e.currentTarget.value)}
												maxLength={5}
											/>
										</div>
									</div>

									<div className="mt-4 flex">
										<Button type="submit">Add</Button>
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
