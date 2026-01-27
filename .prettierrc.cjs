/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  printWidth: 100,
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  astroAllowShorthand: false,
};
