require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "bicou",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  }
};
