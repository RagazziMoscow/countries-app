const isProdMode = process.env.NODE_ENV === "production";

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": isProdMode ? "warn" : "off",
    "no-debugger": isProdMode ? "warn" : "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-trailing-spaces": "off",
    "space-before-function-paren": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
