module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './tests/setupTests.ts'
  ],
  roots: [
    './tests'
  ],
};
