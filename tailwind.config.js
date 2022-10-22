module.exports = {
	prefix: '',
	important: true,
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./components/**/**/*.{js,ts,jsx,tsx}',
		'./store/*.{js,ts,jsx,tsx}',
		'./pages/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	theme: {
		triangles: { // defaults to {}
		  'left': {
		    direction: 'left',      // one of 'left', 'right', 'up', 'down', 'left-up', 'left-down', 'right-up', and 'right-down'
		    size: '24px',            // defaults to defaultSize
		    height: '12px',        // defaults to half the size; has no effect on the diagonal directions (e.g. 'left-up')
		    color: 'currentColor',  // defaults to defaultColor
		  },
		},
	    },
	    variants: {
		triangles: ['responsive'], // defaults to []
	    },
	    plugins: [
		require('tailwind-scrollbar-hide'),
		require('tailwindcss-triangles')({
		  componentPrefix: 'c-',        // defaults to 'c-'
		  defaultSize: '1em',           // defaults to '1em'
		  defaultColor: 'currentColor', // defaults to 'currentColor'
		}),
	    ],
};