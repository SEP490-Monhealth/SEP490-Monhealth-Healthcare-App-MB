module.exports = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "public/icons",
    "src/constants",
    "src/lib",
    "src/utils"
  ]
}
