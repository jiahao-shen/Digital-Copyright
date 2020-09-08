const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});

const User = require('../models/user')
const Image = require('../models/image')

// async function saveImage() {
//   try {
//     const image = new Image({
//       url: 'http://localhost:3000/images/what.jpg',
//       title: '大帅比',
//       owner: 'jason',
//       ipfs_hash: 'fjdiajif',
//       otherInfo: {}
//     })
//     const result = await image.save()
//     console.log(result._id)
//   } catch (err) {
//     console.log(err)
//   }
// }

// saveImage()

async function getImage() {
  try {
    const images = await Image.find({}).select('url')
    console.log(images)
  } catch(err) {
    console.error(err)
  }
}
getImage()