module.exports = {
    content: ["./src/**/*.{jsx, js}", "./index.html", "./*.{js, jsx}"],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': 'rgba(135,181,127,1)',
        'dark-green': 'rgb(106, 141, 110)',
        'gray-dark': '#273444',
        'gray': 'rgba(50,50,50,0.8)',
        'gray-green-light': 'rgba(228, 248, 229, 1)',
        'white': 'rgb(255,255,255)',
        'black': 'rgb(0,0,0)'
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        serif: ['Viaoda Libre', 'serif'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        }
      }
    },
    plugins: [],
  }