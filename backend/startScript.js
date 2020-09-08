const spawn = require('child_process').spawn
const ipfs = spawn('ipfs', ['daemon'])
ipfs.stdout.on('data', data => {
  console.log(data.toString())
})
const npm = spawn('npm', ['run', 'dev'])
npm.stdout.on('data', data => {
  console.log(data.toString())
})
