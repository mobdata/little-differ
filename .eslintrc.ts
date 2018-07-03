{
  "parser": "typescript-eslint-parser",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "document": true,
    "window": true,
    "fetch": true
  },
  "rules": {
    "import/no-extraneous-dependencies": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "import/no-unresolved": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "import/extensions": [0, { "devDependencies": ["modules/*", "components/*"] }],
    "no-multi-spaces": [2, { "exceptions": { "VariableDeclarator": true }}],
    "no-prototype-builtins": [0],
    "no-undef": [0],
    "no-unused-vars": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"]}],
    "semi": [0]
  }
}
