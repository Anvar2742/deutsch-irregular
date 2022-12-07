/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateRows: {
                main: "10% 80% 10%",
                cards: "50% 50%",
                verbs: "10% 90%",
            },
            colors: {
                primary: "#0077b6",
                "dark-blue": "#001d3d",
            },
            boxShadow: {
                card: "-1px 0px 8px 2px rgba(0,0,0,0.2)",
            },
        },
    },
    plugins: [],
};
