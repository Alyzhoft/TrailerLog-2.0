import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ComboBox from './ComboBox';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';

type Props = {
	open: boolean;
	close: () => void;
};

export default function Modal({ open, close }: Props) {
	return (
		<>
			<Transition show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-x-0 -top-64 z-10 overflow-y-auto"
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
							<Dialog.Overlay className="fixed inset-0" />
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
								<Dialog.Title as="h3" className="text-lg font-large leading-6 text-gray-900">
									Add Trailer
								</Dialog.Title>

								<form
									onSubmit={(e) => {
										e.preventDefault();
										close();
									}}
								>
									<div className="mt-3 flex justify-between">
										{/* <div>
											<ComboBox labelName={'Category'} options={['TEST', 'TEST']} />
										</div>
										<div>
											<ComboBox labelName={'Carrier'} options={['TEST', 'TEST']} />
										</div> */}
									</div>

									<div className="flex justify-between mt-3">
										<Input labelText="Trailer Number" placeholder="Enter Trailer Number" />
										<Input labelText="Trailer Location" disabled />
									</div>

									<div className="mt-3">
										<TextArea labelText="Comments" />
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
