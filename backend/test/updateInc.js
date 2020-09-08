const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const User = require('../models/user')

User.updateOne(
  {username: 'crsong@bupt.edu.cn'},
  {$push: {allimages: '5dd65caa4c57aec730c99dc0'},
   $inc: {monitorCount: 1}}
).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})