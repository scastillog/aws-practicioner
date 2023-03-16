module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "babel-jest",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
