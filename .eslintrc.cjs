require("@rakkasjs/eslint-config/patch");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["@rakkasjs"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "import/prefer-default-export": "off",
    "react/function-component-definition": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/require-default-props": "off",
    "linebreak-style": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "@typescript-eslint/naming-convention": "off",
    "no-console": "off",
  },
};
