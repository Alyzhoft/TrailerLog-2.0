/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from '@reach/router';

const navigation = [
	{ name: 'Requests', href: '/requests', current: true },
	{ name: 'Primary Lot', href: '/primaryLot', current: false },
	{ name: 'RVAC', href: '/', current: false },
	{ name: 'RMAN', href: '/rman', current: false },
	{ name: 'Search', href: '/search', current: false },
];

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	return (
		<div>
			<Disclosure as="nav" className="bg-green-600 border-b border-gray-200">
				{({ open }) => (
					<>
						<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex justify-between h-12">
								<div className="flex justify-between w-full">
									<div className="flex-shrink-0 flex items-center">
										<Link className="flex" to="/">
											<img
												src="https://assets.renewalbyandersen.com/-/media/Images/Components/Navigation/header_logo.png?h=64&la=en&w=190&hash=9A5DBCD209227805BE452D77C90F3C21"
												alt="true"
												width="100px"
											/>
										</Link>
									</div>
									<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
										{navigation.map((item, index) => (
											<Link
												key={item.name}
												to={item.href}
												className={classNames(
													'border-transparent text-white hover:white hover:text-white',
													'inline-flex items-center pt-1 border-b-2 text-md font-medium',
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>

								<div className="-mr-2 flex items-center sm:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="pt-2 pb-3 space-y-1">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? 'bg-indigo-50 border-indigo-500 text-indigo-700'
												: 'border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
											'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</a>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
