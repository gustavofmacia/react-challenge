import { FlatCompat } from '@eslint/eslintrc'
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  }),
]
export default eslintConfig
