import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import clsx from 'clsx';
import Button from '../ui/Button';
import ColorPicker from '../ui/ColorPickers';

type Props = {
	open: boolean;
	addOpen: () => void;
	inRequest: () => void;
	//   spotNumber: any;
	//   trailerLocation?: TrailerLocation | null;
	close: () => void;
};

export default function AddInModal({
	open,
	close,
	addOpen,
	inRequest,
}: //   spotNumber,
//   trailerLocation,
Props) {
	const [color, setColor] = useState('');
	const [colorOpen, setColorOpen] = useState(false);

	console.log(color);

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
							<div className="inline-block w-full max-w-sm p-6 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<form
									className={clsx(colorOpen ? 'h-96' : null)}
									onSubmit={(e) => {
										e.preventDefault();
										close();
									}}
								>
									<div className="mt-4 flex w-full">
										<Button classes="w-full justify-center text-xl" type="submit" onClick={addOpen}>
											Add
										</Button>
										<div className="ml-2 w-full">
											<Button
												classes="w-full justify-center text-xl"
												variant="primary"
												close={close}
												onClick={inRequest}
											>
												In
											</Button>
										</div>
									</div>
									<div>
										<ColorPicker
											open={(open) => setColorOpen(open)}
											setColor={(color) => setColor(color)}
										/>
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
