/** @type {import('eslint').BaseConfig} */
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    allowAutomaticSingleRunInference: true,
    cacheLifetime: {
      // we pretty well never create/change tsconfig structure - so no need to ever evict the cache
      // in the rare case that we do - just need to manually restart their IDE.
      glob: 'Infinity',
    },
  },
  plugins: ['@typescript-eslint', '@emotion', 'monorepo-dependencies'],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    JSX: true,
  },
  rules: {
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks:
          '()',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-empty-pattern': 'warn',
    'no-case-declarations': 'warn',
    'no-unsafe-finally': 'warn',
    'no-useless-catch': 'warn',
    'no-fallthrough': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-global-assign': 'off',
    'no-misleading-character-class': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    'no-loss-of-precision': 'off',
    'no-regex-spaces': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-misused-new': 'off',
    // Uncomment after fix with self dependency
    // 'monorepo-dependencies/no-unlisted-package-import': 'error'
  }
};
