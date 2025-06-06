/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  semi: true,
  quoteProps: 'consistent',
  tailwindFunctions: ['clsx'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;