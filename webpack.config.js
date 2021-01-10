const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'none',
   entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
   },
   target: 'web',
   resolve: {
      extensions: ['.ts', '.tsx', '.js']
   },
   module: {
      rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: '/node_modules/'
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            test: /\.(jpg|png|svg|gif)$/,
            loader: 'file-loader',
            options: {
               name: 'images/[name].[ext]'
            }
         }
      ]
   },
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(__dirname, 'public', 'index.html')
      })
   ]
}