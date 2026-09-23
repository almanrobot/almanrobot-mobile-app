module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  semi: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    // '^(.*)/components/(.*)$', // Add any folders you want to be separate
    '^(.*)/(?!generated)(.*)/(.*)$', // Everything not generated
    '^(.*)/generated/(.*)$', // Everything generated
    '^[./]', // Absolute path imports
  ],
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      parser: 'flow',
    },
  ],
};
