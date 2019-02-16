const env = process.env.NODE_ENV
if(env === 'production') {
  module.exports = 'https://glacial-crag-88214.herokuapp.com'
}
else {
  module.exports = 'http://localhost:5000'
} 


