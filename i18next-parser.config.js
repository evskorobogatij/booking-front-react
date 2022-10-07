// i18next-parser.config.js
module.exports = {
  defaultNamespace: 'translation',
  defaultValue: '',
  indentation: 2,
  keepRemoved: false,
  keySeparator: '.',
  lineEnding: 'auto',
  locales: ['en', 'ru'],
  useKeysAsDefaultValue: true,
  lexers: {
    ts: [
      {
        lexer: 'JavascriptLexer',
        functions: ['t'], // Array of functions to match
        functionsNamespace: ['useTranslation', 'withTranslation'], // Array of functions to match for namespace
      },
    ],
    jsx: [
      {
        lexer: 'JsxLexer',
        attr: 'i18nKey', // Attribute for the keys
      },
    ],
  },
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
}
