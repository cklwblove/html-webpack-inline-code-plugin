Inline Code tag for the HTML Webpack Plugin
===========================================
[![npm version](https://badge.fury.io/js/html-webpack-inline-code-plugin.svg)](https://badge.fury.io/js/html-webpack-inline-code-plugin) [![Build status](https://travis-ci.org/cklwblove/html-webpack-inline-code-plugin.svg?branch=master)](https://travis-ci.org/cklwblove/html-webpack-inline-code-plugin) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) (version 3.x or 4 or higher).  It allows you to embed javascript and css source inline.

Installation
------------
You must be running webpack on node 6 or higher.

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-inline-code-plugin
```

Basic Usage
-----------
Require the plugin in your webpack config:

```javascript
var HtmlWebpackInlineCodePlugin = require('html-webpack-inline-code-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInlineCodePlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

Options
-------
The available options are:
- `headTags` | `bodyTags`: `array`
  - `tagsName`: `string`,
  Specifies the code extensions to use to determine. One of the `script` or `style` values;
  - `tagsCode`: `string`
  Inserted specific code.

Example
-------
config code
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackInlineSourcePlugin({
    headTags: [{
      tagName: 'script',
      tagCode: `var startTime = +new Date();`
    }],
    bodyTags: [{
      tagName: 'script',
      tagCode: `var endTime = +new Date();`
    }]
  })
]  
```

Source html code
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Example</title>
  </head>
  <body>
    <noscript>
      <strong>很抱歉，如果没有启用JavaScript，此项目将无法正常运行。请启用它。</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

Build compiled code
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Example</title>
    <script type="text/javascript">var startTime = +new Date();</script>
  </head>
  <body>
    <noscript>
      <strong>很抱歉，如果没有启用JavaScript，此项目将无法正常运行。请启用它。</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script type="text/javascript">var endTime = +new Date();</script>
  </body>
</html>
```


