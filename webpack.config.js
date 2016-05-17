module.exports = {


  entry:'./public/js/main.jsx',
  output:{
    filename: './public/js/bundle.js'

  },
  module:{
    loaders:[
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      }
    ]
  },
  externals:{

  },
  resolve:{
    extensions: ['', '.jsx', '.js']
  }
}
