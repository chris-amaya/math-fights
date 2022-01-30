module.exports = {
  // preset: 'ts-jest',
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
  testEnvironment: 'node',
  // testMatch: ['**/__tests__/**/*.test.ts'],
  // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  // transform: {
  //   '^.+\\.[t|j]sx?$': 'babel-jest',
  // },

  // transform: {
  //   'test.(ts|tsx)': 'ts-jest',
  // },
  modulePathIgnorePatterns: ['<rootDir>/__tests__/utils/'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  //   setupFilesAfterEnv: ['./setup.js'],
  //   testTimeout: 0, // one minute timeout for all tests
  // testRegex: '/__tests__/.*\\.(spec|test)\\.[tj]sx?$',

  // moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  // maxWorkers: 1,

  // isolatedModules: true,
  // forceExit: true,
  // globals: {
  //   'ts-jest': {
  //     isolatedModules: true,
  //     maxWorkers: 1,
  //     forceExit: true,
  //     // runInBand: true,
  //   },
  // },
}
