/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#171717",
        accent: {
          blue: "#3b82f6",
          purple: "#a855f7",
        }
      },
      gridTemplateColumns: {
        'bento': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
