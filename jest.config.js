export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|mjs?|ts?)$",
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleFileExtensions: ["ts", "js", "jsx", "mjs"]
  }
