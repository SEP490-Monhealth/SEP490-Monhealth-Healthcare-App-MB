module.exports = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/constants",
    "/lib",
    "/utils",
    "/components/global/atoms"
  ]
}
