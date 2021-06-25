import { InputHTMLAttributes } from 'react';
import Label from './Label';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	labelText: string;
};

export default function Input({ labelText, ...props }: Props) {
	return (
		<div className="w-full col-span-6 sm:col-span-3">
			<Label>{labelText}</Label>
			<input className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md px-4 py-2 border border-gray-400 focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20" type="text" {...props} />
		</div>
	);
}
