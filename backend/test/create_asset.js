const config = require('../config/config').config
const driver = require('bigchaindb-driver')
const conn = new driver.Connection(config.api_path)

const publicKey = 'B9FbvxCYytcyxRgzB6SK2ibiYNQjB7MXyNP4MrxMgrS2'
const privateKey = 'HXQQmYkPxEUhbdqdhDA6LYzUGz6WFT5Xyc9WX3QmYALa'
const imgUrl = '/home/jason/Documents/newestProjectShow/backend/public/images/files-1572787372229-fox-4589927_960_720.jpg'
const hash = 'QmQcVzjgUDUDTaU9tmu4YeuWLX6D1NZgjDLHiKYT8fesxs'
const assetData = {
  img: {
    url: imgUrl,
    ipfs_hash: hash
  }
}
const metaData = {
  'transfer': 'earth'
}
const txCreateSimple = driver.Transaction.makeCreateTransaction(
  assetData,
  metaData,

  // A transaction needs an output
  [ driver.Transaction.makeOutput(
          driver.Transaction.makeEd25519Condition(publicKey))
  ],
  publicKey
)
const txCreateSimpleSigned = driver.Transaction.signTransaction(txCreateSimple, privateKey)
conn.postTransactionCommit(txCreateSimpleSigned)
.then(res => {
  console.log(res)
})
