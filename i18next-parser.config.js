export default {
    locales: ["en", "zh"],
    output: "locales/$LOCALE.json",
    input: ["src/**/*.{js,jsx,ts,tsx}"],
    defaultValue: (lng, ns, key) => key,
};
