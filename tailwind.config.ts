/** @type {import("tailwindcss").Config} */
module.exports = {
    // purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        textColor: {
            primary: "#3490dc",
            secondary: "#ffed4a",
            danger: "#e3342f",
            whitesmoke: "#f5f5f5",
            aliceblue: "#f0f8ff",
        },
        screens: {
            mobile: {max: "639px"},
            pad: {min: "640px", max: "767px"},
            pc: {min: "768px", max: "1200px"},
            screen: {min: "1201px"},
        },
        borderRadius: {
            sm: "0.125rem",
            r: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "2xl": "1rem",
            "3xl": "1.5rem",
            "4xl": "2rem",
            full: "9999px",
        },
    },
    plugins: [],
    // media:跟随系统（win10在个性化-颜色-选择默认应用模式  中修改）   class:手动通过事件改变
    darkMode: "class", // or "media" or "class"
};
