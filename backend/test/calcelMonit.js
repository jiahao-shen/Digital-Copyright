const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const User = require('../models/user')
const Image = require('../models/image')


async function main() {
  const mail = 'crsong@bupt.edu.cn'
  const imageID = '5dd366f464dc5a43cc942728'
  const Promise = require('bluebird')

  const promises = Promise.all([
    User.findOne({mail: mail}),
    Image.findById(imageID),
    User.updateOne(
      {mail: mail},
      {$pull: {monitorimages: imageID}},
      {$inc: {monitorCount: -1}}
    ),
    Image.updateOne(
      { _id: imageID },
      {$set: {whetherMonitor: false}}
    )
  ])
  try {
    const result = await promises.exec()
    console.log(result)
  } catch(err) {
    console.log('err: ', err)
  }
  promises.then(result => {
    console.log(result)
  }).catch(err => {
    console.error(err)
  })
}
main()