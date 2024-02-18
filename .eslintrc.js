module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        printWidth: 80,
        singleQuote: true,
        quoteProps: 'consistent',
        jsxSingleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
