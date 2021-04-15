import React from 'react';

export default function Navbar() {
	return (
		<div className="flex justify-between h-16 bg-green-600 shadow-md">
			<div className="flex ml-4">
				<a className="flex" href="/#/">
					<img src="https://assets.renewalbyandersen.com/-/media/Images/Components/Navigation/header_logo.png?h=64&la=en&w=190&hash=9A5DBCD209227805BE452D77C90F3C21" alt="true" width="100px" />
				</a>
			</div>
			<div className="flex">
				<button className="mx-5 text-xl hover:text-white">Home</button>
				<button className="mx-5 text-xl hover:text-white">Home</button>
				<button className="mx-5 text-xl hover:text-white">Home</button>
				<button className="mx-5 text-xl hover:text-white">Home</button>
			</div>
		</div>
	);
}
