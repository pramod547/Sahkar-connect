/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coopForestGreen: '#1B5E4B',
        coopSageGreen: '#7BA68D',
        coopTerracotta: '#C67B4C',
        coopWarmSand: '#F5ECD7',
        coopCreamWhite: '#FEFAF3',
        coopWarmAmber: '#D4A843',
        coopDeepCharcoal: '#2B2B2B',
      },
    },
  },
  plugins: [],
};
