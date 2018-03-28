const path = require('path')

module.exports = {
  context: __dirname + '/src',
  output: {
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        // "test" is commonly used to match the file extension
        test: /\.ts$/,

        // "include" is commonly used to match the directories
        include: [
          path.resolve(__dirname, "src")
        ],

        // "exclude" should be used to exclude exceptions
        // try to prefer "include" when possible

        // the "loader"
        loader: "ts-loader" // or "babel" because webpack adds the '-loader' automatically
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.ts'
    ]
  }
}
