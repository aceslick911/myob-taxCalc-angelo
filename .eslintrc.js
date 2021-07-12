module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "@typescript-eslint/no-var-requires": 0,

    "@typescript-eslint/ban-types": 1,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "no-empty": 1,
    "@typescript-eslint/explicit-module-boundary-types": 1,
    "no-case-declarations": 1,

    "prefer-template": 1,
  },
};
