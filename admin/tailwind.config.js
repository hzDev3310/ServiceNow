/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#93c5fd',
        danger: '#dc2626',
        success: '#10b981',
        warning: '#facc15',
        black: '#000',
        white: '#fff',
        dark: '#0c0a09',
        light: '#f5f5f4',
        // Add more custom colors here if needed
      },
    },
  },
  plugins: [],
}

