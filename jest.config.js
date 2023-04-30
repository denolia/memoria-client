/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*"],
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
};
