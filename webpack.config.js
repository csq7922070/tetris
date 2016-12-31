var path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [{ 
        test: /\.js$/, 
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
    }]
  }
}