# babel-plugin-material-ui


[![build status](https://img.shields.io/travis/umidbekkarimov/babel-plugin-material-ui/master.svg?style=flat-square)](https://travis-ci.org/umidbekkarimov/babel-plugin-material-ui)
[![npm version](https://img.shields.io/npm/v/babel-plugin-material-ui.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-material-ui)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-material-ui.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-material-ui)
[![Codecov](https://img.shields.io/codecov/c/gh/umidbekkarimov/babel-plugin-material-ui.svg?style=flat-square)](https://codecov.io/gh/umidbekkarimov/babel-plugin-material-ui)

Babel plugin to cherry-pick used [material-ui](http://www.material-ui.com) modules 

## Example

**In**

```javascript
import { TextField, SelectField, FlatButton } from 'material-ui'
import { ActionAccessibility, ActionAccessible, ActionAccountBalance } from 'material-ui/svg-icons'
```

**Out**

```javascript
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';

```

## Installation

```bash
npm install --save-dev babel-plugin-material-ui
```

## Usage

### **Via .babelrc (Recommended)**

**.babelrc**

```json
{
  "plugins": ["material-ui"]
}
```

### Via CLI

```bash
babel --plugins material-ui script.js
```

### **Via Node API**

```javascript
require("babel-core").transform("code", {
  plugins: ["material-ui"]
});
```

### Thanks

Heavily inspired by [babel-plugin-date-fns](https://github.com/date-fns/babel-plugin-date-fns), [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) and [babel-plugin-recharts](https://github.com/recharts/babel-plugin-recharts).
