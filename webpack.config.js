var path = require('path');

module.exports = {
  entry: './src/app.js',

  devtool: 'sourcemap',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [{ 
        test: /\.js$/, 
        include: path.join(__dirname, 'src'),
        loader: 'babel' 
    }]
  }
}