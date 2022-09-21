// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight:{
        "80":"calc(100vh - 3.5rem)"
        },
      width:{
        "47":"47%",
        "7m":"7%",
        "13m":"13%",
        "10m":"10%",
        "14m":"14%",
        "86":"86%",
        "18m":"18%",
        "20m":"20%",
        "24m":"24%",
        "28m":"28%",
        "30m":"30rem"
      },
      fontSize:{
        'x-sm':'.8rem'
      },
      colors:{
        "lgray":"rgb(244,243,239)",
        "lblue":"rgb(47,194,240)",
        "darkBlue": "rgb( 17 , 82 , 119 )",
        "d1Blue":"rgb( 52 , 133 , 147 )",
        "darkgray":"rgb( 105 , 105 , 105 )"
      },
   
    },
    screens: {
    'm1': '320px',
      // => @media (min-width: 320px) { ... }

    'm2': '481px',
     
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
   
    'xl': '1280px',
    '2xl':'1536px'
   

     
    },
  },
  plugins: [],
}
