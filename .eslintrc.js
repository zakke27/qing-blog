module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', '@emotion'],
  rules: {
    'prettier/prettier': 'warn',
    'react/prop-types': 'warn',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',
    'no-unused-vars': ['warn', { varsIgnorePattern: 'React' }]
  }
}
