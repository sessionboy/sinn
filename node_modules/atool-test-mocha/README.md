# atool-test-mocha

> `note`: Tests with browser, use [atool-test](https://github.com/ant-tool/atool-test)

[![NPM version](https://img.shields.io/npm/v/atool-test-mocha.svg?style=flat)](https://npmjs.org/package/atool-test-mocha)
[![Build Status](https://img.shields.io/travis/ant-tool/atool-test-mocha.svg?style=flat)](https://travis-ci.org/ant-tool/atool-test-mocha)
[![Coverage Status](https://img.shields.io/coveralls/ant-tool/atool-test-mocha.svg?style=flat)](https://coveralls.io/r/ant-tool/atool-test-mocha)

Simple configuration, run tests with jsdom.

## Built-in

- [mocha](http://mochajs.org/)
- [chai](http://chaijs.com/api)
- [sinon](http://sinonjs.org/)

## Usage

```bash
npm install atool-test-mocha --save-dev
```
```json
"srcipts": {
  "test": "atool-test-mocha"
}
```

## Options

- `--coverage`: coverage output;
- support mocha cli options (`--bail`, `--timeout`, `--watch`, `--recursive`...) 

## Custom testDir

default tests dir `test`, cutom dir `atool-test-mocha ${customDirName}`

