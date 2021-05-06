import Label from './Label';

type Props = {
	labelText: string;
};

export default function TextArea({ labelText }: Props) {
	return (
		<div>
			<Label>{labelText}</Label>
			<textarea className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md px-4 py-2 border focus:border-brand-600 focus:ring-brand-500 disabled:opacity-60 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20" />
		</div>
	);
}
