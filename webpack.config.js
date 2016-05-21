module.exports = {
  entry:'./public/js/main.jsx',
  output:{
    filename: './public/js/bundle.js'

  },
  module:{
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  externals:{

  },
  resolve:{
    extensions: ['', '.jsx', '.js']
  }
}
