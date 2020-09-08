const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});

const Article = require('../models/article')
const User = require('../models/user')
User.updateOne(
  {mail: 'crsong@bupt.edu.cn'},
  {$push: {articles: "5dbfe320a181214417a82dd9"}}
).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})