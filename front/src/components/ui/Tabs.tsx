import { type } from 'os';

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
const tabs = [
	{ name: 'Carriers', href: '#', current: true },
	{ name: 'Categories', href: '#', current: false },
];

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

type props = {
	selected: (selected: string) => void;
};

export default function Example({ selected }: props) {
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
				>
					{tabs.map((tab) => (
						<option onClick={() => console.log('clicked')} key={tab.name}>
							{tab.name}
						</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<nav
					className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
					aria-label="Tabs"
				>
					{tabs.map((tab, tabIdx) => (
						<a
							onClick={() => {
								tabs[0].current = false;
								tabs[1].current = false;
								tab.current = true;
								selected(tab.name);
							}}
							key={tab.name}
							href={tab.href}
							className={classNames(
								tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
								tabIdx === 0 ? 'rounded-l-lg' : '',
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
								'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
							)}
							aria-current={tab.current ? 'page' : undefined}
						>
							<span>{tab.name}</span>
							<span
								aria-hidden="true"
								className={classNames(
									tab.current ? 'bg-indigo-500' : 'bg-transparent',
									'absolute inset-x-0 bottom-0 h-0.5',
								)}
							/>
						</a>
					))}
				</nav>
			</div>
		</div>
	);
}
