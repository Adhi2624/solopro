/** @type {import('tailwindcss').Config} */
const config = {
  "compilerOptions": {
    "baseUrl": ".", // Base directory to resolve non-relative module names
    "paths": {
      "@/lib/*": ["src/lib/*"], // Example alias mapping
    },
  },
};

module.exports = config;

module.exports = {
  content: [
    './src/**/*.{js,jsx}', // Adjust this path according to your project structure
    './public/index.html', // Ensure Tailwind processes your HTML file
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {},
      keyframes: {},
    },
  },
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
};
