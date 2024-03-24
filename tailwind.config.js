/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
        'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    ],

    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                bannerHome: "url('https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/bg/h1-hero-bg.png')",
            },
            fontFamily: {
                ['family-title']: `'Exo 2', sans-serif`,
                ['family-text']: `'Work Sans', sans-serif`,
            },
            colors: {
                primary: {
                    ['blur']: 'rgba(0,167,172,.3)',
                    100: '#00A7AC',
                    200: '#b2e4e6',
                },
                secondary: {
                    100: '#915bfe2e',
                },

                content: {
                    ['text']: '#595959',
                    ['title']: '#061421',
                },
            },

            fontWeight: {
                ['title']: '700',
                ['content']: '400',
            },

            padding: {
                ['section']: '60px',
            },
            margin: {
                ['section']: '60px',
            },
        },
        keyframes: {
            wiggle: {
                '0%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(0)' },
            },
        },
        screens: {
            xl: { min: '1024px', max: '1279px' },
            lg: { min: '768px', max: '1023px' },
            tb: { min: '640px', max: '767px' },
            mb: { max: '639px' },
        },
    },
    plugins: ['tailwind-scrollbar'],
});
