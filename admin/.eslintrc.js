module.exports = {
  extends: ["alloy", "alloy/typescript", "plugin:vue/recommended", "plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 200,
        endOfLine: "auto",
      },
    ],
    "vue/no-v-model-argument": ["off"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 6,
        },
        multiline: {
          max: 5,
        },
      },
    ],
    "vue/singleline-html-element-content-newline": ["off"],
    "vue/v-slot-style": ["off"],
    "no-promise-executor-return": "off",
    "no-unreachable-loop": "off",
    "no-unsafe-optional-chaining": "off",
  },
};
