module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:import/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      env: {
        jest: true,
      },
      extends: ["plugin:jest/recommended"],
      plugins: ["jest"],
      rules: {},
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".tsx", ".ts"],
      },
    ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
  },
};
