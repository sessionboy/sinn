easy-css-transform-builder
==========================

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/easy-css-transform-builder.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/easy-css-transform-builder)
[![npm version](https://img.shields.io/npm/v/easy-css-transform-builder.svg?style=flat-square)](http://badge.fury.io/js/easy-css-transform-builder)
[![David](https://img.shields.io/david/tsuyoshiwada/easy-css-transform-builder.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/easy-css-transform-builder)
[![David dev](https://img.shields.io/david/dev/tsuyoshiwada/easy-css-transform-builder.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/easy-css-transform-builder/#info=devDependencies&view=table)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/tsuyoshiwada/easy-css-transform-builder/master/LICENSE)


Easily build CSS transform values with JavaScript.


## Install

```bash
$ npm install easy-css-transform-builder
```


## Usage

You can build transform values with a simple API.

```javascript
import { createCSSTransformBuilder } from "easy-css-transform-builder";

const builder = createCSSTransformBuilder({
  length: "px",
  angle: "deg"
});

const transform = builder({
  translateX: 30,
  scale: 2.8,
  rotate3d: [1, 0, 0, 60],
  skewY: "40rad"
});

console.log(transform);
// translateX(30px) scale(2.8) rotate3d(1, 0, 0, 60deg) skewY(40rad)
```



## API

You can set the following properties.


### CSS Properties

* `translateX`: `number` | `string`
* `translateY`: `number` | `string`
* `translateZ`: `number` | `string`
* `translate`: [`number * 2`] | `string`
* `translate3d`: [`number * 3`] | `string`
* `scale`: `number` | `string`
* `scale3d`: [`number * 3`] | `string`
* `scaleX`: `number` | `string`
* `scaleY`: `number` | `string`
* `scaleZ`: `number` | `string`
* `rotate`: `number` | `string`
* `rotate3d`: [`number * 4`] | `string`
* `rotateX`: `number` | `string`
* `rotateY`: `number` | `string`
* `rotateZ`: `number` | `string`
* `skewX`: `number` | `string`
* `skewY`: `number` | `string`
* `perspective`: `number` | `string`
* `matrix`: [`number * 6`] | `string`
* `matrix3d`: [`number * 16`] | `string`


### Exports

```javascript
import {
  createCSSTransformBuilder,
  properties
} from "easy-css-transform-builder";
```


### `createCSSTransformBuilder(units = { length: "px", angle: "deg" })`

Create a Builder.

**units: {Object}**  
**return: {}**

**Example:**

```javascript
const builder = createCSSTransformBuilder({ length: "em", angle: "rad" })

builder({ translateY: 50 }); // translateY(50px)
```


### `properties`

An array of supported property names.

```javascript
console.log(properties);
// [
//   "translateX",
//   "translateY",
//   "translateZ",
//   ...
// ]
```



## Example with React.js

Because it's a simple API, it can be used in various environments.

```javascript
import React, { Component } from "react";
import { createCSSTransformBuilder } from "easy-css-transform-builder";

const builder = createCSSTransformBuilder();


class MyComponent extends Component {
  render() {
    return (
      <div style={{
        background: "#efefef",
        transform: builder({
          translateX: 100,
          translateY: -50,
          rotate: 180
        })
      }}>
        Easy build CSS transform values!!
      </div>
    );
  }
}
```



## License

Released under the [MIT Licence](https://raw.githubusercontent.com/tsuyoshiwada/easy-css-transform-builder/master/LICENSE)




## Author

[tsuyoshiwada](https://github.com/tsuyoshiwada)



## Contribution

Thank you for your interest in easy-css-transform-builder.js.
Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/easy-css-transform-builder/issues).

**Before you open a PR:**

Be careful to follow the code style of the project. Run `npm test` after your changes and ensure you do not introduce any new errors or warnings.
All new features and changes need documentation.

Thanks!
