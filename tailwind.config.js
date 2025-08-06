/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // proje yapına göre dizinleri güncelle
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], 
      },
    
      screens: {
        "3xl": "120rem",
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.3, 0, 0, 1)",
        snappy: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
