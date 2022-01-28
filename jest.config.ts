module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 100,
      statements: -10,
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/", "<rootDir>/dist", "<rootDir>/app.ts"]
};
