import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import ComboBox from '../ui/ComboBox';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { SocketContext } from '../../utils/socket';
import { trailer } from '../../types';
import { CarrierContext, CategoryContext } from '../../utils/context';

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
	trailer: trailer;
	close: () => void;
};

export default function AddModal({ open, close, spotNumber, trailerLocation = TrailerLocation.RVAC, trailer }: Props) {
	console.log(trailer);

	const [id, setId] = useState(trailer.id);
	const [trailerNumber, setTrailerNumber] = useState(trailer.trailerNumber);
	const [category, setCategory] = useState(trailer.category);
	const [carrier, setCarrier] = useState(trailer.category);
	const [comments, setComments] = useState(trailer.comments);
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);

	const socket = useContext(SocketContext);
	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

	useEffect(() => {
		setCarrier(trailer.carrier);
		setCategory(trailer.category);
		setTrailerNumber(trailer.trailerNumber);
		setComments(trailer.comments);
		setId(trailer.id);
	}, [trailer]);

	useEffect(() => {
		const temp = carriers.map((carrier: any) => {
			return carrier.carrierName;
		});

		setCarrierOptions(temp.sort());
	}, [carriers]);

	useEffect(() => {
		const temp = categories.map((carrier: any) => {
			return carrier.categoryName;
		});

		setCategoriesOptions(temp.sort());
	}, [categories]);

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
									Edit Trailer
								</Dialog.Title>

								<form
									onSubmit={(e) => {
										e.preventDefault();
										socket.emit('updateTrailer', { id, carrier, category, trailerNumber, comments, spotNumber, trailerLocation });
										close();
									}}
								>
									<div className=" md:flex justify-between">
										<div className="w-full mx-1 mt-3">
											<ComboBox
												labelName={'Category'}
												options={categoriesOptions}
												value={category}
												valueChange={(value) => {
													setCategory(value);
												}}
											/>
										</div>
										<div className="w-full mx-1 mt-3">
											<ComboBox labelName={'Carrier'} options={carrierOptions} value={carrier} valueChange={(value) => setCarrier(value)} />
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
										<TextArea labelText="Comments" value={comments} onChange={(e) => setComments(e.target.value)} />
									</div>

									<div className="mt-4 flex">
										<Button type="submit">Save</Button>
										<div className="ml-2">
											<Button variant="primary" close={close}>
												Close
											</Button>
										</div>
										<div className="ml-2">
											<Button
												variant="danger"
												close={close}
												onClick={() => {
													socket.emit('deleteTrailer', { id });

													close();
												}}
											>
												Delete
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
