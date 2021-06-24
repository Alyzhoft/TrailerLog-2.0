import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import ComboBox from '../ui/ComboBox';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { SocketContext } from '../../socket';

type Props = {
	open: boolean;
	trailerLocation: number;
	close: () => void;
};

const options = ['TEST', 'TEST2'];

export default function AddModal({ open, close, trailerLocation }: Props) {
	const [trailerNumber, setTrailerNumber] = useState('');
	const [category, setCategory] = useState(options[0]);
	const [carrier, setCarrier] = useState(options[0]);
	const [comments, setComments] = useState('');

	const socket = useContext(SocketContext);

	return (
		<>
			<Transition show={open} as={Fragment}>
				<Dialog as="div" className="fixed inset-x-0 -top-56 z-10 overflow-y-auto bg-opacity-75 bg-gray-300 h-screen" static open={open} onClose={close}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Dialog.Overlay className="fixed inset-0" />
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
										socket.emit('addTrailer', { carrier, category, trailerNumber, comments, trailerLocation });
										close();
									}}
								>
									<div className="mt-3 flex justify-between">
										<div>
											<ComboBox
												labelName={'Category'}
												options={options}
												value={category}
												valueChange={(value) => {
													setCategory(value);
												}}
											/>
										</div>
										<div>
											<ComboBox labelName={'Carrier'} options={options} value={carrier} valueChange={(value) => setCarrier(value)} />
										</div>
									</div>

									<div className="flex justify-between mt-3">
										<Input labelText="Trailer Number" placeholder="Enter Trailer Number" value={trailerNumber} onChange={(e) => setTrailerNumber(e.currentTarget.value)} />
										<Input labelText="Trailer Location" value={trailerLocation} disabled />
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
