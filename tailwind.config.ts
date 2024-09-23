import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'background': '#171717',
        'grey-900': '#201F24',
      },
      colors: {
        'beige-500': "#98908B",
        'beige-100': "#F8F4F0",
        'grey-900': '#201F24',
        'grey-500': '#696868',
        'grey-300': '#B3B3B3',
        'grey-100': '#F2F2F2',
        'green': '#277C78',
        'yellow': '#F2CDAC',
        'cyan': '#82C9D7',
        'navy': '#626070',
        'red': '#C94736',
        'purple': '#826CB0',
        'purple-light': '#AF81BA',
        'turquoise': '#597C7C',
        'brown': '#93674F',
        'magenta': '#934F6F',
        'blue': '#3F82B2',
        'navy-grey': '#97A0AC',
        'army-green': '#7F9161',
        'gold': '#CAB361',
        'orange': '#BE6C49',
      },
      fontFamily: {
        sans: ['var(--font-public-sans)', 'sans-serif'],
        italic: ['Public Sans Italic', 'sans-serif']
      },
      fontSize: {
        'preset-1': ['32px', {
          lineHeight: '120%',
          letterSpacing: '0',
          fontWeight: '700',
        }],
        'preset-2': ['20px', {
          lineHeight: '120%',
          letterSpacing: '0',
          fontWeight: '700',
        }],
        'preset-3': ['16px', {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '700',
        }],
        'preset-4': ['14px', {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '400',
        }],
        'preset-4-bold': ['14px', {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '700',
        }],
        'preset-5': ['12px', {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '400',
        }],
        'preset-5-bold': ['12px', {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '700',
        }],
      },
      spacing: {
        '50': '4px',
        '100': '8px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
      },
    },
  },
  plugins: [],
};
export default config;
