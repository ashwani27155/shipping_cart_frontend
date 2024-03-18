/**
 * Tailwind CSS configuration file.
 * This file defines the configuration options for Tailwind CSS.
 * It specifies the content to be processed by Tailwind CSS, theme settings, and any extensions.
 * @type {import('tailwindcss').Config} Tailwind CSS configuration object.
 */
module.exports = {
	// Specifies the content to be processed by Tailwind CSS
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	// Theme settings for Tailwind CSS
	theme: {
		// Extending the default theme
		extend: {
			// Customizing container settings
			container: {
				center: true, // Centering container content
			},
		},
	},
	// Plugins for Tailwind CSS (none specified)
	plugins: [],
};
