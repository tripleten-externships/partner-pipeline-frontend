import HeadlessTailwindPlugin from "@headlessui/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
  	screens: {
  		sm: '390px'
  	},
  	extend: {
  		colors: {
  			black: '#121212',
  			white: '#FFFFFF',
  			lightYellow: '#fff7cc',
  			yellow: '#ffea7a',
  			darkYellow: '#ffe871',
  			lightGray: '#f5f5f5',
  			lightBlue: '#c8e1fa',
  			blue: '#64affa',
  			lightPink: '#ffccd4',
  			pink: '#ff8093',
  			lightGreen: '#c9fbc9',
  			green: '#5cd65c',
  			lightPurple: '#f3d3fb',
  			purple: '#e286f9',
  			red: '#ff3636',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: {
				DEFAULT: 'hsl(var(--border))',
				foreground: 'hsl(var(--border-foreground))'
  			},
  			input: {
				DEFAULT: 'hsl(var(--input))',
				foreground: 'hsl(var(--input-foreground))'
  			},
  			ring: {
				DEFAULT: 'hsl(var(--ring))',
				foreground: 'hsl(var(--ring-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			'welcome-title': '44px',
  			'section-header': '32px',
  			'section-subtext': '20px',
  			'paragraph-lg': '16px',
  			'paragraph-sm': '14px',
  			'caption-text': '12px'
  		},
  		fontFamily: {
  			text: [
  				'Rubik',
  				'Arial',
  				'sans'
  			]
  		},
  		maxWidth: {
  			pageContent: '370px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    HeadlessTailwindPlugin({ prefix: "ui" }),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
      require("tailwindcss-animate")
],
};
