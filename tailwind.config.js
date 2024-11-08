// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',   // This includes all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all your components
    './app/**/*.{js,ts,jsx,tsx}', // Include all your app files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
