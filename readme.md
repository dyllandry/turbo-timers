# Turbo Timers

## Development

### React Dev Tools Not Working

There's a bug with either React-devtools or Electron that causes React-devtools to not work. To fix it, follow this guide [Downgrading React-devtools](https://polypane.app/docs/downgrading-react-devtools/). Replace anywhere you see "Polypane" with "turbo-timers".

### Matching ESLint's Module Resolution to TypeScript's

How modules are resolved is customized in the tsconfig through the option "baseUrl". So that eslint can resolve modules in the same way, I installed an eslint module resolution plugin, and a typescript specific resolver plugin. These are setup in the eslint config like such:

```
{
  ...

  "settings": {
    "import/resolver": {
      // this loads <rootdir>/tsconfig.json to eslint
      "typescript": {}
    }
  }

  ...
}
```
