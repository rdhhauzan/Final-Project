module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [require("daisyui")],
	theme: {
		extend: {
			colors: {
				bleki: "#1C2120",
				bluish: "#132743",
				redpink: "#D7385E",
				arrow: "#F8EFD4",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				rubik: ["Rubik", "sans-serif"],
				barlow: ["Barlow", "sans"],
				chakra: ["Chakra Petch", "sans-serif"],
			},
		},
	},
};
