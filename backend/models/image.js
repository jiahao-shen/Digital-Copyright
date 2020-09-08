const mongoose = require('mongoose')
const Schema = mongoose.Schema
const leven = require('leven')

const Image = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  owner: String,
  ipfs_hash: String,
  otherInfo: Object,
  phash: String,
  whetherRegister: Boolean,
  whetherMonitor: Boolean,
  certificate: Object,
  violation: Boolean,
  violationResult: [{
    url: String,
    similarity: Number
  }]
}, {collection: 'image'})

const phashPlugin = schema => {
  schema.query.checkHammingDist = (images, hash) => {
    const result = []
    console.log(images)
    images.forEach(image => {
      if(leven(image['phash'], hash) <= 14) {
        result.push(image)
      }
    })
    return result
  }
}
Image.plugin(phashPlugin)
module.exports = mongoose.model('Image', Image)