/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "kreta-dark-blue": "#385765",
        "kreta-light-blue": "#30a8cb",
      },
    },
  },
  plugins: [],
};
