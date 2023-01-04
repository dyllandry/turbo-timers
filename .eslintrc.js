module.exports = {
  // Provides predefined global variables
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // Inherit traits of other configuration files.
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript"
  ],
  // Use typescript's eslint parser instead of the regular eslint one. Along with the
  // @typescript-eslint plugin, makes eslint report typescript issues too. 
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ]
}
