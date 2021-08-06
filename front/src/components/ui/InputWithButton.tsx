import { SearchIcon } from '@heroicons/react/solid';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	labelText: string;
};

export default function Example({ labelText, ...props }: Props) {
	return (
		<div>
			<label htmlFor="search" className="font-medium text-gray-800 dark:text-gray-200 mb-1">
				{labelText}
			</label>
			<div className="mt-1 flex rounded-md shadow-sm">
				<div className="relative flex items-stretch flex-grow focus-within:z-10">
					<input
						type="text"
						name="search"
						id="search"
						className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md px-4 py-2 border border-gray-400 focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20"
						placeholder="Trailer Number"
						{...props}
					/>
				</div>
				<button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
					<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
}
