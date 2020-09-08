const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});

const User = require('../models/user')
User.findOne({mail: 'crsong@bupt.edu.cn'})
.populate('monitorimages')
.exec((err, docs) => {
  if(err) {
    console.error(err)
  }
  console.log(docs.monitorimages)
})