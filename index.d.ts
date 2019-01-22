import { Plugin } from 'webpack';

interface HtmlWebpackInlineCodePluginOptions {
  /**
   * Path where to save compiled assets
   */
  headTags?: string[];
  bodyTags?: string[];
}

interface HtmlWebpackInlineCodePlugin extends Plugin {
  new (options?: HtmlWebpackInlineCodePluginOptions): HtmlWebpackInlineCodePlugin;
}

declare const htmlWebpackInlineCodePlugin: HtmlWebpackInlineCodePlugin;
export = htmlWebpackInlineCodePlugin
