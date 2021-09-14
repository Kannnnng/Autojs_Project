module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': ['variable', 'function'],
        'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
        'leadingUnderscore': 'allow'
      }
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/semi': ['off'],
    'func-names': ['warn', 'as-needed'],
    'import/extensions': ['error', { ts: 'never' }],
    'linebreak-style': ['off', 'windows'],
    'max-classes-per-file': ['off'],
    'max-len': ['off'],
    'no-cond-assign': ['error', 'except-parens'],
    'no-continue': ['off'],
    'no-empty-function': ['off'],
    'no-plusplus': ['off'],
    'no-restricted-syntax': ['off'],
    'no-shadow': 'off',
    'no-underscore-dangle': ["error", { "allow": ["_temp"] }],
    'no-useless-constructor': ['off'],
    'no-var': ['error'],
    'operator-linebreak': ['error', 'after'],
    'semi-style': ['off', 'first'],
    indent: ['off'],
    semi: ['off'],
  },
};
