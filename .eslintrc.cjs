/* required packages:
 * eslint
 * eslint-config-prettier
 * eslint-plugin-import
 * eslint-plugin-react-hooks
 * @typescript-eslint/eslint-plugin
 * @typescript-eslint/parser
 */

module.exports = {
  root: true,
  ignorePatterns: ["vite.config.ts", "node_modules", "dist", ".yarn"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      plugins: ["@typescript-eslint", "react-hooks", "import"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        project: ["./tsconfig.json"],
      },
      rules: {
        semi: 2,
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
          },
        ],

        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-non-null-assertion": "off",
      },
      settings: {
        "import/resolver": {
          node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        },
      },
    },
  ],
};
