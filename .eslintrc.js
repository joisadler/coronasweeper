module.exports = {
  "parser": "/usr/local/lib/node_modules/babel-eslint",
  "extends": "airbnb/base",
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jquery": true
  },
  "rules": {
    "no-multi-assign": 0,
    "prefer-arrow-callback": 0,
    "func-names": 0,
    "prefer-destructuring": 0,
    "no-restricted-globals": 0,
    "linebreak-style": 0,
    "lines-around-directive": 0,
    "strict" : 0,
    "no-console": 0,
    "vars-on-top" : 0,
    "no-var": 0,
    "no-alert": 0,
    "radix": 0,
    "no-plusplus": 0,
    "prefer-template": 0,
    "import/no-cycle": 0,
    "comma-dangle": 0,
    "max-len": [
      "error",
      {
        "code": 100,
        "ignoreComments": true
      }
    ]
  }
}
