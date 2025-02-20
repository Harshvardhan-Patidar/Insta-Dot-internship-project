import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
// const withMT = require("@material-tailwind/react/utils/withMT");
 
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})


// const withMT = require("@material-tailwind/react/utils/withMT");
 
// module.exports = withMT({
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// });