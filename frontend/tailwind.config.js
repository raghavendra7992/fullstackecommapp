/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*,{html,js,jsx"],
  theme: {
    fontFamily:{
      Roboto:["Roboto", "sans-serif"],
      Proppins:["Proppins", "sans-serif"],
    },
    extend:{
      screens:{
        "100px":"1050px",
        "110px":"1110px",
        "800px":"800px",
        "1300px":"1300px",
        "400px":"400px",
      },
    },
  },
  plugins: [],
}
