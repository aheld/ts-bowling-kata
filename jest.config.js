/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/* eslint-disable */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  maxWorkers: '1',
}
