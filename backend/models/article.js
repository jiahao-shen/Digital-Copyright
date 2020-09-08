const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema({
  title: {
    required: true,
    type: String
  },
  brief: String,
  content: String,
  date: Date,
  cover: String,
  to: String,
  author: String
}, {collection: 'article'})

module.exports = mongoose.model('Article', Article)