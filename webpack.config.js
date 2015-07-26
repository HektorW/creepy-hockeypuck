
module.exports = {
  cache: false,
  entry: './src/main.js',
  output: {
    path: 'src/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  },
  devtool: 'sourcemap'
};
