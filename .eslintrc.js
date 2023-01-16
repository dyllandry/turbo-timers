module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  // Enables ESLint to parse TypeScript code
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // Required for rules in @typescript-eslint/recommended-requiring-type-checking
    // https://typescript-eslint.io/linting/typed-linting/
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  plugins: [
    // Load package @typescript-eslint as a plugin. Enables typescript-eslint's rules.
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ]
}
