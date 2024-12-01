/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          primary: '#1e1e1e',
          secondary: '#2a2a2a',
          accent: '#333333',
          text: '#ffffff',
          muted: '#888888',
        },
        // Light theme colors
        light: {
          primary: '#ffffff',
          secondary: '#f5f5f5',
          accent: '#e5e5e5',
          text: '#1e1e1e',
          muted: '#666666',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
