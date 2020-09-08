const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
const fs = require('fs')
const path = '/home/jason/Documents/newestProjectShow/backend/public/images/avatar-1572709052502-artist-3480274.jpg'
const files = [
  {
    path: '/home/jason/Documents/newestProjectShow/backend/public/images/avatar-1572709052502-artist-3480274.jpg',
    content: fs.createReadStream(path)
  }
]
ipfs.add(fs.readFileSync(path))
.then(files => {
  console.log(files)
})