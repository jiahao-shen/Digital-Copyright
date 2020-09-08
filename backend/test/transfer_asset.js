const config = require('../config/config').config
const driver = require('bigchaindb-driver')
const conn = new driver.Connection(config.api_path)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const Image = require('../models/image')
const publicKey = 'B9FbvxCYytcyxRgzB6SK2ibiYNQjB7MXyNP4MrxMgrS2'
const privateKey = 'HXQQmYkPxEUhbdqdhDA6LYzUGz6WFT5Xyc9WX3QmYALa'
const transactionID = '91a3f1b630e4b92650cedb964a7c88b27ee3ed6a09e1dfc3410971f190d95581'
const bobKey = 'ASipwaHvnZdVeLfmB5gAC8kFPwxDvzjiEEgHPutRmMCY'
const bobPrivate = 'BxSi4Sp8ikkEbPkrDbUBAJiG8u3i8JyBrhgWg3NSxT4m'
// conn.getTransaction('ad3f11fb8b7ffdfde3cbe8e11d55e662ba4aa9b021d316606110a1125c83b507')
// .then(res => {
//   // console.log(res)
//   const transferToElse = driver.Transaction.makeTransferTransaction(
//     [{tx: res, output_index: 0}],
//     [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(publicKey))],
//     {price: '100 euro'}
//   )
//   let txCreateSimpleSigned = driver.Transaction.signTransaction(transferToElse, bobPrivate)
//   return conn.postTransactionCommit(txCreateSimpleSigned)
// })
// .then(res => {
//   console.log('result:', res)
// })
// .catch(err => {
//   console.log(err)
// })
// conn.searchAssets('91a3f1b630e4b92650cedb964a7c88b27ee3ed6a09e1dfc3410971f190d95581')
// .then(res => {
//   console.log(res[0].data.img)
// })
// conn.getTransaction('ad3f11fb8b7ffdfde3cbe8e11d55e662ba4aa9b021d316606110a1125c83b507')
// .then(res => {
//   console.log(res)
// })
Image.findById('5dc17724c663ffb80aedd277')
.then(res => {
  const id = res.otherInfo.id
  // console.log(res)
  return conn.getTransaction(id)
  
})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})