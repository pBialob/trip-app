import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  extend: {
    content: {
      "": '""',
    },
    fontFamily: {
      sans: '"Arial",--apple-system,BlinkMacSystemFont,"Segoe UI",Rot',
    },
    fontSize: {
      xs: ["1.2rem", "1"],
      sm: ["1.4rem", "1.25"],
      lg: ["1.8rem", "1.75"],
      xl: ["2rem", "1.75"],
      "2xl": ["2.4rem", "2"],
      "3xl": ["3rem", "2.25"],
      "4xl": ["3.6rem", "2.5"],
    },
    colors: {
      white: "#fff",
      primary: "#FCD535",
      "primary-focus": "#F0B90B",
      "primary-content": "#181720",
      secondary: "#FEF6D8",
      "secondary-focus": "#F8ECBC",
      "secondary-content": "#C99400",
      accent: "#F5F5F5",
      "accent-focus": "#EAECEF",
      "accent-content": "#707A8A",
      neutral: "#181A2A",
      "neutral-focus": "#131522",
      "neutral-content": "#EDF2F7",
      "base-100": "#FFFFFF",
      "base-200": "#FAFAFA",
      "base-300": "#B7BDC6",
      "base-400": "#474D57",
      "base-content": "#181A2A",
      "base-border": "#CFCFCF",
      info: "#01A9F2",
      "info-content": "#FFFFFF",
      success: "#0ECB81",
      "success-content": "#FFFFFF",
      warning: "#FBBD23",
      "warning-content": "#382800",
      error: "#F6465D",
      "error-content": "#FFFFFF",
    },
    spacing: {
      0: "0",
      1: "0.4rem",
      2: "0.8rem",
      3: "1.2rem",
      4: "1.6rem",
      5: "2rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4rem",
      11: "4.4rem",
      12: "4.8rem",
      "navigation-height": "var(--navigation-)",
    },
    fontWeight: {
      light: "400",
      normal: "500",
      bold: "600",
    },
    backgroundImage: {},
    boxShadow: {
      lg: "4px 4px 10px 5px rgba(0, 0, 0, 0.35)",
      md: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    animation: {
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 400ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
      hide: "hide 100ms ease-in",
      slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      swipeOut: "swipeOut 100ms ease-out",
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    keyframes: {
      slideDownAndFade: {
        from: { opacity: "0", transform: "translateY(-2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: "0", transform: "translateX(2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: "0", transform: "translateY(2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: "0", transform: "translateX(-2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      overlayShow: {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      contentShow: {
        from: {
          opacity: "0",
          transform: "translate(-50%, -48%) scale(0.96)",
        },
        to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
      },
      enterFromRight: {
        from: { opacity: "0", transform: "translateX(200px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      enterFromLeft: {
        from: { opacity: "0", transform: "translateX(-200px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      exitToRight: {
        from: { opacity: "1", transform: "translateX(0)" },
        to: { opacity: "0", transform: "translateX(200px)" },
      },
      exitToLeft: {
        from: { opacity: "1", transform: "translateX(0)" },
        to: { opacity: "0", transform: "translateX(-200px)" },
      },
      scaleIn: {
        from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
        to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
      },
      scaleOut: {
        from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
      },
      fadeIn: {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      fadeOut: {
        from: { opacity: "1" },
        to: { opacity: "0" },
      },
      hide: {
        from: { opacity: "1" },
        to: { opacity: "0" },
      },
      slideIn: {
        from: {
          transform: "translateX(calc(100% + var(--viewport-padding)))",
        },
        to: { transform: "translateX(0))" },
      },
      swipeOut: {
        from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
    },
  },
} satisfies Config;
