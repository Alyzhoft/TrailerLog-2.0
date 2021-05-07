module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'odd', 'even'],
		borderWidth: ['responsive', 'last', 'hover', 'focus'],
		margin: ['responsive', 'last'],
		cursor: ['hover', 'focus'],
	},
	plugins: [],
};
