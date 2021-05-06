import React from 'react';

type comboBoxProps = {
	labelName: string;
	options: string[];
};

export default function ComboBox({ labelName, options }: comboBoxProps) {
	return (
		<div className=" w-64 col-span-6 sm:col-span-3">
			<label htmlFor={labelName} className="font-medium text-gray-800 dark:text-gray-200 mb-1">
				{labelName}
			</label>
			<select id={labelName} name={labelName} autoComplete={labelName} className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md px-4 py-2 border focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20">
				{options.map((option) => {
					return <option>{option}</option>;
				})}
			</select>
		</div>
	);
}
