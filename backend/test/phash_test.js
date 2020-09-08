// const imghash = require('imghash')
// const path = require('path')
// const leven = require('leven')
// const imgPath = path.join(__dirname, '../public/images/files-1572787372229-fox-4589927_960_720.jpg')
// const imgPath2 = path.join(__dirname, '../public/images/files-1572787372229-fox-4589927_960_7202.jpg')
// const imgPath3 = path.join(__dirname, '../public/images/files-1574070879078-gear-4606749_1920.jpg')

// const hash1 = imghash.hash(imgPath)
// const hash2 = imghash.hash(imgPath2)
// const hash3 = imghash.hash(imgPath3)

// Promise
// .all([hash1, hash2, hash3])
// .then(result => {
//   console.log(result)
//   console.log(leven(result[1], result[2]))
//   console.log(leven(result[1], result[2]) / 29)
// })

// const assert = require('assert')
// // Create some random error frames.

// // let err;
// // err = new Error('test error');
// // assert.ifError(err);
// function what() {
//   assert.equal(1, 2)
// }
// // what()
// async function tell(){
//   try {
//     const you = null
//     assert.equal(you, 1)
//   }catch(err){
//     console.log('this is err')
//   }
// }
// tell()

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
// const Image = require('../models/image')
// // Image.find({})
// // .checkHammingDist('0e17787070f02c3c')
// // .exec((err, doc) => {
// //   assert.equal(err)
// //   console.log(doc)
// // })
// // .catch(err => {
// //   console.log(err)
// // })

// // Image.find({
// //   $where: function() {
    
// //     if(this.phash.length >= 14){
// //       return this
// //     }
// //   }
// // })
// // .exec((err, doc) => {
// //   assert.equal(err, null)
// //   console.log(doc)
// // })
// // Image.find({})
// // .exec((err, doc) => {
// //   assert.equal(err, null)
// //   doc.forEach(image => {
// //     if(typeof(image.phash) === 'undefined') {
      
// //     } else {
// //       if(leven(image.phash, '0e17787070f02c3c') <= 14) {
// //         console.log(image._id)
// //       }
// //     }
// //   })
// // })

// // const fs = require('fs')
// // fs.unlinkSync(path.join(__dirname, '../public/images/files-1573021990880-u=1518682579,4064448354&fm=26&gp=0.jpg'))
// // .then(err => {
// //   if(err){
// //     console.log(err)
// //   } else{
// //     console.log('jjjj')
// //   }
// // })

const imghash = require('imghash')
const path = require('path')
const leven = require('leven')
const imgPath = path.join(__dirname, '../public/images/原图.jpg')
const imgPath2 = path.join(__dirname, '../public/images/剪裁.jpg')

const hash1 = imghash.hash(imgPath)
const hash2 = imghash.hash(imgPath2)
Promise.all([hash1, hash2])
.then(res => {
  console.log(leven(res[0], res[1]))
})
