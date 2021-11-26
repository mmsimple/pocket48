module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: [
      2,
      2
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    // quotes: [
    //   2,
    //   'single'
    // ],
    semi: [
      2,
      'never'
    ],
    camelcase: 0,
    'space-before-function-paren': [
      2,
      {
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'prefer-arrow-callback': 1,
    'eol-last': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': 2,
    'no-extra-semi': 2,
    'no-mixed-spaces-and-tabs': [
      2,
      false
    ],
    'no-multi-spaces': 2,
    'no-func-assign': 2
  }
};
