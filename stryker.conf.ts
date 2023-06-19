module.exports = {
  mutate: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],

  testRunner: 'vitest',

  reporters: ['html', 'progress'],

  ignorePatterns: [
    '**/node_modules/*',
    '**/dist/*',
    '**/*.js',
    '**/*.json',
    'src/framework/database/*',
  ],

  vitest: {
    jestConfig: require('./vite.config.ts'),
  },
}
