require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint-config-bicou",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  }
};
