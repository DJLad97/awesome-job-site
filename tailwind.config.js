/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '512px',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['dark', 'light'],
    },
};
