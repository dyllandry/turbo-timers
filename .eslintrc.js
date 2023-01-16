module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "tsconfig.json"
      }
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  plugins: [
    "@typescript-eslint",
    "import"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript"
  ]
}
