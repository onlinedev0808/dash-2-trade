const rules = {
  // these cause errors of eslint itself (at least I have them)
  "no-useless-rename": "off",

  camelcase: "off",
  "no-unused-expressions": "off",
  "no-constant-condition": "off",
  "no-console": "off",
  "no-plusplus": "off",
  "no-underscore-dangle": "off",
  "prefer-destructuring": "off",
  "consistent-return": "off",
  "linebreak-style": "off",
  "import/extensions": "off",
  "import/no-absolute-path": "off",
  "react/prop-types": "off",
  "react/react-in-jsx-scope": "off",
  "react/function-component-definition": "off",
  "react/button-has-type": "off",
  "react/require-default-props": "off",
  "jsx-a11y/no-static-element-interactions": "off",
  "jsx-a11y/click-events-have-key-events": "off",
  "jsx-a11y/anchor-is-valid": "off",
  "@typescript-eslint/naming-convention": "off",
  "react/jsx-props-no-spreading": "off",

  "no-var": "warn",
  "vars-on-top": "warn",
  "block-scoped-var": "warn",
  eqeqeq: "warn",
  "arrow-body-style": "warn",
  "prefer-template": "warn",
  "default-case": "warn",
  "spaced-comment": "warn",
  "import/prefer-default-export": "warn",
  "react/no-array-index-key": "warn",
  "react/jsx-filename-extension": "warn",
  "react-hooks/rules-of-hooks": "warn",
  "react/no-unused-prop-types": "warn",
  "react/destructuring-assignment": "warn",
  "@typescript-eslint/ban-ts-comment": "warn",

  "no-shadow": "off",
  "@typescript-eslint/no-shadow": "warn",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": "warn",

  "@typescript-eslint/no-namespace": "off",
  "max-classes-per-file": ["error", { ignoreExpressions: true, "max": 10 }],
};

module.exports = {
  extends: ["next/core-web-vitals", "airbnb", "prettier"],
  plugins: ["react"],
  env: {
    browser: true,
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      // extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      extends: [
        "next/core-web-vitals",
        "airbnb",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      plugins: ["react"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules,
    },
  ],
  rules,
};
