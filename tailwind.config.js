module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#BCBCBC',
        'secondary-2': '#525252',
        'secondary-3': '#676767',
        'secondary-4': '#7E7E7E',
        black: '#363636',
        'black-15': 'rgba(54, 54, 54, .15)'
      },
      boxShadow: {
        'md-y-0': '0 0 10px rgba(54, 54, 54, .10)'
      },
      spacing: {
        328: '328px',
        overwindow: '1000%'
      }
    }
  },
  plugins: []
}
