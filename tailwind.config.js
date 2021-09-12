module.exports = {
    mode: 'jit',
    purge: ['./resources/**/*.{js,jsx,ts,tsx,vue,edge}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    'black': '#252A2E',
                    'teal': '#127E83',
                    'brown': '#797874',
                    'tan': '#EFEFE9',
                    'tan-light': '#F4F4F0',
                },
                gray: {
                    100: '#f7f7f7',
                    200: '#EEEEEE',
                    300: '#DDDDDD',
                    400: '#CCCCCC',
                    500: '#AAAAAA',
                    600: '#959595',
                },
                yellow: {
                    1: '#FCEDCC',
                    2: '#F6D07F',
                    3: '#F4B936',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
