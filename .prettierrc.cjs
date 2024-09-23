/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  astroAllowShorthand: false,
}
