import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      containers: {
        "2xs": "22rem",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "font-sans"],
      },
      fontSize: {
        h1Bold: ["32px", { lineHeight: "42px", letterSpacing: "-0.04em", fontWeight: "700" }],
        h1Medium: ["32px", { lineHeight: "42px", letterSpacing: "-0.04em", fontWeight: "500" }],
        h1Regular: ["32px", { lineHeight: "42px", letterSpacing: "-0.04em", fontWeight: "400" }],
        h2Bold: ["28px", { lineHeight: "38px", letterSpacing: "-0.04em", fontWeight: "700" }],
        h2Medium: ["28px", { lineHeight: "38px", letterSpacing: "-0.04em", fontWeight: "500" }],
        h2Regular: ["28px", { lineHeight: "38px", letterSpacing: "-0.04em", fontWeight: "400" }],
        h3Bold: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "700" }],
        h3Medium: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "500" }],
        h3Regular: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "400" }],
        h4Bold: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "700" }],
        h4Medium: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "500" }],
        h4Regular: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "400" }],
        h5Bold: ["16px", { lineHeight: "22px", letterSpacing: "-0.04em", fontWeight: "700" }],
        h5Medium: ["16px", { lineHeight: "22px", letterSpacing: "-0.04em", fontWeight: "500" }],
        h5Regular: ["16px", { lineHeight: "22px", letterSpacing: "-0.04em", fontWeight: "400" }],
        body1Bold: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "700" }],
        body1Medium: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "500" }],
        body1Regular: ["24px", { lineHeight: "34px", letterSpacing: "-0.04em", fontWeight: "400" }],
        body2Bold: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "700" }],
        body2Medium: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "500" }],
        body2Regular: ["20px", { lineHeight: "28px", letterSpacing: "-0.04em", fontWeight: "400" }],
        body3Bold: ["16px", { lineHeight: "24px", letterSpacing: "-0.04em", fontWeight: "700" }],
        body3Medium: ["16px", { lineHeight: "24px", letterSpacing: "-0.04em", fontWeight: "500" }],
        body3Regular: ["16px", { lineHeight: "24px", letterSpacing: "-0.04em", fontWeight: "400" }],
        body4Bold: ["14px", { lineHeight: "20px", letterSpacing: "-0.04em", fontWeight: "700" }],
        body4Medium: ["14px", { lineHeight: "20px", letterSpacing: "-0.04em", fontWeight: "500" }],
        body4Regular: ["14px", { lineHeight: "20px", letterSpacing: "-0.04em", fontWeight: "400" }],
        body5Bold: ["12px", { lineHeight: "18px", letterSpacing: "-0.04em", fontWeight: "700" }],
        body5Medium: ["12px", { lineHeight: "18px", letterSpacing: "-0.04em", fontWeight: "500" }],
        body5Regular: ["12px", { lineHeight: "18px", letterSpacing: "-0.04em", fontWeight: "400" }],
        captionBold: ["10px", { lineHeight: "16px", letterSpacing: "-0.04em", fontWeight: "700" }],
        captionMedium: ["10px", { lineHeight: "16px", letterSpacing: "-0.04em", fontWeight: "500" }],
        captionRegular: ["10px", { lineHeight: "16px", letterSpacing: "-0.04em", fontWeight: "400" }],
      },
      colors: {
        caremedi: {
          primary: {
            100: "#EDF7F0",
            200: "#DBEFE2",
            300: "#B8DFC5",
            400: "#94CEA7",
            500: "#71BE8A",
            600: "#4DAE6D",
            700: "#3E8B57",
            800: "#2E6841",
            900: "#1F462C",
            1000: "#0F2316",
          },
          secondary: {
            100: "#F1FBFA",
            200: "#DDF1EF",
            300: "#C9E8E5",
            400: "#A1D5D0",
            500: "#78C2BB",
            600: "#289C91",
            700: "#207C74",
            800: "#185E57",
            900: "#103E3A",
            1000: "#081F1D",
          },
          gray: {
            100: "#FFFFFF",
            200: "#F6F6F6",
            300: "#EEEEEE",
            400: "#D7D7D7",
            500: "#B9B9B9",
            600: "#AAAAAA",
            700: "#8A8A8A",
            800: "#666666",
            900: "#373737",
            1000: "#212121",
          },
          base: {
            100: "#F2F5F5",
            200: "#D7E5E5",
            300: "#AFC1C1",
            400: "#95B2B2",
            500: "#5F7775",
            600: "#404F4F",
            700: "#253736",
          },
          graphBlue: {
            100: "#E5F1FF",
            200: "#CCE3FF",
            300: "#99C8FF",
            400: "#66ACFF",
            500: "#3391FF",
            600: "#0075FF",
            700: "#005ECC",
            800: "#004699",
            900: "#002F66",
            1000: "#001733",
          },
          accent: {
            100: "#FDF0EE",
            200: "#FCE1DE",
            300: "#FAD2CD",
            400: "#F6A59C",
            500: "#F3877B",
            600: "#F0695A",
            700: "#C65549",
            800: "#9C4137",
            900: "#732E26",
            1000: "#491A14",
          },
          alert: {
            success: "#73D13D",
            successLight: "#D9F7BE",
            danger: "#FF4D4F",
            dangerLight: "#FFCCC7",
            warning: "#FFC53D",
            warningLight: "#FFF1B8",
            warningLight2: "#FFEA7D",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: "0.7",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "fade-in": "fade-in 0.4s",
        "fade-out": "fade-out 0.4s",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar-hide"),
  ],
} satisfies Config

export default config
