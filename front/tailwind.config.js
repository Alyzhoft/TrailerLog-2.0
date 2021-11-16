module.exports = {
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
						letterSpacing: '-0.01rem',
					},
				],
				xsSpace: [
					'0.6rem',
					{
						letterSpacing: '-0.02rem',
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
