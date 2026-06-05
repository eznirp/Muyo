/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f6ff',
          200: '#b3dff0',
          300: '#87ceeb',
          400: '#5eb8d8',
          500: '#2c9cce',
          600: '#1e7eb3',
          700: '#1a5f8f',
          800: '#164975',
          900: '#1a2f42',
        },
        text: {
          light: '#2c3e50',
          lighter: '#3d4d61',
          dark: '#1a252f',
        },
        accent: '#87ceeb',
      },
      backgroundColor: {
        base: '#e0f6ff',
        dark: '#1a2f42',
      },
      textColor: {
        base: '#2c3e50',
        heading: '#1a252f',
      },
      borderColor: {
        light: '#b3dff0',
        dark: '#2d4560',
      },
    },
  },
  plugins: [],
}
