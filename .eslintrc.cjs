module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended",
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
