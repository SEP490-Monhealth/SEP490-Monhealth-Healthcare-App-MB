module.exports = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "public/icons",
    "/constants",
    "/lib",
    "/schemas",
    "/utils"
  ]
}
