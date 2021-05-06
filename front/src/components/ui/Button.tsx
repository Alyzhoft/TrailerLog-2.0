import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	close?: () => void;
	variant?: keyof typeof VARIANTS;
};

const VARIANTS = {
	primary: {
		base: 'border-transparent text-white focus:outline-none',
		active: 'bg-green-600 hover:bg-green-500 focus:shadow-outline-indigo focus:border-green-700 active:bg-green-700',
		disabled: 'bg-green-400',
	},
	default: {
		base: 'border-gray-300',
		active: 'bg-white text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline',
		disabled: 'bg-gray-100',
	},
	danger: {
		base: 'border-transparent text-white',
		active: 'bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red',
		disabled: 'bg-red-400',
	},
};

export default function Button({ close, variant = 'primary', ...props }: Props) {
	const variantStyles = VARIANTS[variant] || VARIANTS.default;
	return <button type="button" className={clsx('shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150 focus:outline-none', variantStyles.base, props.disabled ? variantStyles.disabled : variantStyles.active)} onClick={close} {...props} />;
}
