module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			screens: {
				building: '1200px',
			},
			fontSize: {
				'2xs': [
					'0.5rem',
					{
						letterSpacing: '-0.01em',
					},
				],
			},
		},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
		borderWidth: ['responsive', 'last', 'hover', 'focus'],
		margin: ['responsive', 'last'],
		cursor: ['hover', 'focus'],
	},
	plugins: [],
};
