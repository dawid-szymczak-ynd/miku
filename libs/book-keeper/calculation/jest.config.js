module.exports = {
  name: 'book-keeper-calculation',
  preset: '../../../jest.config.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../coverage/libs/book-keeper/calculation',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 70,
      lines: 90,
      statements: 90,
    },
  },
};
