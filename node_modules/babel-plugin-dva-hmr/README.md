# babel-plugin-dva-hmr

[![NPM version](https://img.shields.io/npm/v/babel-plugin-dva-hmr.svg?style=flat)](https://npmjs.org/package/babel-plugin-dva-hmr)
[![Build Status](https://img.shields.io/travis/dvajs/babel-plugin-dva-hmr.svg?style=flat)](https://travis-ci.org/dvajs/babel-plugin-dva-hmr)
[![Coverage Status](https://img.shields.io/coveralls/dvajs/babel-plugin-dva-hmr.svg?style=flat)](https://coveralls.io/r/dvajs/babel-plugin-dva-hmr)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-dva-hmr.svg?style=flat)](https://npmjs.org/package/babel-plugin-dva-hmr)

Hmr babel plugin for dva.

---

## Install

```bash
$ npm install babel-plugin-dva-hmr redbox-react@1.x --save-dev
```

## Usage

.babelrc

```javascript
{
  "plugins": [
    ["dva-hmr", {
      "container": "#root",
      "quiet": false
    }]
  ]
}
```

webpack.config.js for atool-build, [example](https://github.com/dvajs/dva/blob/master/examples/user-dashboard/webpack.config.js)

```javascript
if (env === 'development') {
  webpackConfig.babel.plugins.push(['dva-hmr', {
    container: '#root',
    quiet: false,
  }]);
}
```

## License

MIT
