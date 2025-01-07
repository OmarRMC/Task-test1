/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-700',
    'bg-red-700',
    'bg-red-50',
    'bg-green-700',
    'bg-green-50',
    'bg-orange-700',
    'text-red-800',
    'text-green-800',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}