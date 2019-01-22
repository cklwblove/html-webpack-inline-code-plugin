'use strict';

/**
 *
 * @param options
 * headTags | bodyTags: {
 *     tagName: 'style' | 'script'
 *     tagCode: ''
 * }
 * @constructor
 */
function HtmlWebpackInlineCodePlugin (options) {
  options = options || {};
  this.headTags = options.headTags;
  this.bodyTags = options.bodyTags;
}

HtmlWebpackInlineCodePlugin.prototype.apply = function (compiler) {
  var self = this;

  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('HtmlWebpackInlineCodePlugin', function (compilation) {
      if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackInlineCodePlugin', function (htmlPluginData, callback) {
          self.processTags(htmlPluginData);
          callback(null);
        });
      } else {
        // HtmlWebPackPlugin 4.x
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        var hooks = HtmlWebpackPlugin.getHooks(compilation);

        hooks.alterAssetTagGroups.tapAsync('HtmlWebpackInlineCodePlugin', function (htmlPluginData, callback) {
          self.processTags(htmlPluginData);
          callback(null);
        });
      }
    });
  } else {
    // webpack 3 support
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
        self.processTags(htmlPluginData);
        callback(null, htmlPluginData);
      });
    });
  }
};

HtmlWebpackInlineCodePlugin.prototype.processTags = function (htmlPluginData) {
  var self = this;

  // inline js
  var scriptTag = {
    tagName: 'script',
    closeTag: true,
    attributes: {
      type: 'text/javascript'
    }
  };
  // inline css
  var styleTag = {
    tagName: 'style',
    closeTag: true,
    attributes: {
      type: 'text/css'
    }
  };

  // head code
  if (Array.isArray(self.headTags) && self.headTags.length) {
    self.headTags.forEach(function (tag) {
      if (tag.tagName === 'script') {
        scriptTag.innerHTML = tag.tagCode;
        htmlPluginData.head.push(scriptTag);
      }
      if (tag.tagName === 'style') {
        styleTag.innerHTML = tag.tagCode;
        htmlPluginData.head.push(styleTag);
      }
    });
  }
  // body code
  if (Array.isArray(self.bodyTags) && self.bodyTags.length) {
    self.headTags.forEach(function (tag) {
      if (tag.tagName === 'script') {
        scriptTag.innerHTML = tag.tagCode;
        htmlPluginData.body.unshift(scriptTag);
      }
      if (tag.tagName === 'style') {
        styleTag.innerHTML = tag.tagCode;
        htmlPluginData.body.unshift(styleTag);
      }
    });
  }
};

module.exports = HtmlWebpackInlineCodePlugin;
