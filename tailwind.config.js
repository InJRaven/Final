/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,scss}"],
  theme: {
    extend: {
      fontFamily: {
        roboto:["Roboto", "serif"],
        inter: ["Inter", "sans-serif"],
        apple: ["SF Pro", "sans-serif"],
        "ki-duotone": "ki-duotone",
        "ki-filled": "ki-filled",
        "ki-outline": "ki-outline",
        "ki-solid": "ki-solid",
      },
      fontSize: {
        xs: ["1.2rem", { lineHeight: "1.8rem" }],
        sm: ["1.4rem", { lineHeight: "2rem" }],
        md: ["1.6rem", { lineHeight: "2.4rem" }],
        lg: ["1.8rem", { lineHeight: "2.8rem" }],
        xl: ["2rem", { lineHeight: "2.8rem" }],
        "display-xs": ["2.4rem", { lineHeight: "3.2rem" }],
        "display-sm": ["3rem", { lineHeight: "3rem" }],
        "display-md": [" 3.6rem", { lineHeight: "4.4rem" }],
        "display-lg": ["4.8rem", { lineHeight: "6rem" }],
        "display-xl": ["6rem", { lineHeight: "7.2rem" }],
        "display-2xl": ["7.2rem", { lineHeight: "9rem" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        gray: {
          100: "var(--tw-gray-100)",
          200: "var(--tw-gray-200)",
          300: "var(--tw-gray-300)",
          400: "var(--tw-gray-400)",
          500: "var(--tw-gray-500)",
          600: "var(--tw-gray-600)",
          700: "var(--tw-gray-700)",
          800: "var(--tw-gray-800)",
          900: "var(--tw-gray-900)",
        },
        dark: {
          DEFAULT: "var(--tw-dark)",
          active: "var(--tw-dark-active)",
          gray: "var(--tw-dark-gray)",
          light: "var(--tw-dark-light)",
        },
        light: {
          DEFAULT: "var(--tw-light)",
          active: "var(--tw-light-active)",
          dark: "var(--tw-light-dark)",
        },
      },
      boxShadow: {
        header: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
        card: "0px 6.5px 8.667px -2.167px rgba(10, 13, 18, 0.1), 0px 2.167px 3.25px -1.083px rgba(10, 13, 18, 0.1), 0px 1.083px 1.083px -0.542px rgba(10, 13, 18, 0.1)",
        button: "-2px 4px 7px 0px rgba(0, 0, 0, 0.25)",
        post: '0 1px 4px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        xl: { max: "1200px" }, // => @media (max-width: 1200px) { ... }
        lg: { max: "1000px" },
        md: { max: "800px" },
        sm: { max: "640px" },
        xs: { max: "450px" },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      // Lấy các giá trị font-size từ theme hoặc tự thiết lập giá trị font-size cho các breakpoint
      addBase({
        html: {
          fontSize: "62.5%", // Mặc định: 1rem = 10px
        },
        "@media (max-width: 1200px)": {
          html: {
            fontSize: "56.25%", // Khi màn hình nhỏ hơn 1200px (1rem = 9px)
          },
        },
        "@media (max-width: 1000px)": {
          html: {
            fontSize: "50%", // Khi màn hình nhỏ hơn 1000px (1rem = 8px)
          },
        },
        "@media (max-width: 800px)": {
          html: {
            fontSize: "45%", // Khi màn hình nhỏ hơn 800px (1rem = 7.2px)
          },
        },
        "@media (max-width: 640px)": {
          html: {
            fontSize: "40%", // Khi màn hình nhỏ hơn 600px (1rem = 6px)
          },
        },
        "@media (max-width: 450px)": {
          html: {
            fontSize: "35%", // Khi màn hình nhỏ hơn 400px (1rem = 5px)
          },
        },
      });
    },
    
  ],
};
