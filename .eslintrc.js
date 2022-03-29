module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    '@typescript-eslint/semi': [2, 'never'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
