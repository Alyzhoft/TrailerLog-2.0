import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import ComboBox from '../ui/ComboBox';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { SocketContext } from '../../socket';

enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

type Props = {
	open: boolean;
	spotNumber: number;
	trailerLocation?: TrailerLocation;
	close: () => void;
};

const options = ['TEST', 'TEST2'];

export default function AddModal({ open, close, spotNumber, trailerLocation = TrailerLocation.RVAC }: Props) {
	const [trailerNumber, setTrailerNumber] = useState('');
	const [category, setCategory] = useState(options[0]);
	const [carrier, setCarrier] = useState(options[0]);
	const [comments, setComments] = useState('');

	const socket = useContext(SocketContext);

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
								<Dialog.Title as="h3" className=" text-2xl font-large leading-6 text-gray-900">
									Add Trailer
								</Dialog.Title>

								<form
									onSubmit={(e) => {
										e.preventDefault();
										socket.emit('addTrailer', { carrier, category, trailerNumber, comments, spotNumber, trailerLocation });
										close();
									}}
								>
									<div className=" md:flex justify-between">
										<div className="w-full mx-1 mt-3">
											<ComboBox
												labelName={'Category'}
												options={options}
												value={category}
												valueChange={(value) => {
													setCategory(value);
												}}
											/>
										</div>
										<div className="w-full mx-1 mt-3">
											<ComboBox labelName={'Carrier'} options={options} value={carrier} valueChange={(value) => setCarrier(value)} />
										</div>
									</div>

									<div className="md:flex justify-between ">
										<div className="w-full mx-1 mt-3">
											<Input labelText="Trailer Number" placeholder="Enter Trailer Number" value={trailerNumber} onChange={(e) => setTrailerNumber(e.currentTarget.value)} />
										</div>
										<div className="w-full mx-1 mt-3">
											<Input labelText="Trailer Location" value={spotNumber} disabled />
										</div>
									</div>

									<div className="mt-3">
										<TextArea labelText="Comments" onChange={(e) => setComments(e.target.value)} />
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
