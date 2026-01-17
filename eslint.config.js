import { defineConfig } from "eslint";
import nuxt from "@nuxt/eslint-config";
import vue from "eslint-plugin-vue";

export default defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    ...nuxt
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: {
    vue
  },
  rules: {
    camelcase: "error",
    indent: ["error", 2],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-debugger": "error",
    "no-empty": "error",
    "no-extra-parens": "error",
    "no-extra-semi": "error",
    "comma-dangle": ["error", "never"],
    "spaced-comment": ["error", "always"]
  }
});
