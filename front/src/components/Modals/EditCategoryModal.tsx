/* eslint-disable react/jsx-no-undef */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { SocketContext } from '../../utils/socket';
import ColorPicker from '../ui/ColorPicker';
import { CarrierContext, CategoryContext } from '../../utils/context';

type Props = {
	open: boolean;
	close: () => void;
	categoryprop: any;
};

export default function EditModal({ open, close, categoryprop }: Props) {
	const [category, setCategory] = useState(categoryprop.categoryName);
	const [categoryID, setCategoryID] = useState(categoryprop.id);
	const [carrierOptions, setCarrierOptions] = useState<string[]>([]);
	const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
	const [color, setColor] = useState('');
	const [colorOpen, setColorOpen] = useState(false);
	const socket = useContext(SocketContext);
	const carriers = useContext(CarrierContext);
	const categories = useContext(CategoryContext);

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
									Edit Category
								</Dialog.Title>

								<form
									className={clsx(colorOpen ? 'h-96' : null)}
									onSubmit={(e) => {
										e.preventDefault();
										socket.emit('editCategory', {
											category,
											categoryID,
											color,
										});
										close();
									}}
								>
									<div className="md:flex justify-between ">
										<div className="w-full mx-1 mt-3">
											<Input
												labelText="Trailer Number"
												placeholder="Enter Trailer Number"
												value={category}
												onChange={(e) => setCategory(e.currentTarget.value)}
											/>
										</div>
									</div>
									<div className="w-full h-full">
										<ColorPicker
											setColor={(color) => setColor(color)}
											open={(open) => setColorOpen(open)}
										/>
									</div>
									<div className="mt-4 flex">
										<Button type="submit">Save</Button>
										<div className="ml-2">
											<Button variant="primary" close={close}>
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
