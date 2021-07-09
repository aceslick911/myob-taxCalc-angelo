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
    indent: ["warn", 2, { SwitchCase: 1 }],
    "@typescript-eslint/no-var-requires": 0,

    // "@typescript-eslint/ban-types": 0,
    // "@typescript-eslint/no-explicit-any": 0,
    // "@typescript-eslint/no-unused-vars": 0,
    // "no-empty": 0,
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "react/prop-types": "off",
    // "no-case-declarations": 0,
  },
};
