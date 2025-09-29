import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import globals from "globals";

export default [
  // Общие правила для JS и Vue
  {
    files: ["**/*.js", "**/*.vue"],
    rules: {
      "no-unused-vars": "warn",
      //"no-console": "warn",
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error",
    },
  },

  ...vue.configs["flat/recommended"],
];
