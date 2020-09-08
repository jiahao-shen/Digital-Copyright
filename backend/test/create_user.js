const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
const User = require('../models/user')
const driver = require('bigchaindb-driver')
const keys = new driver.Ed25519Keypair()
console.log(keys)
const user = new User({
  mail: 'crsong@bupt.edu.cn',
  date: new Date(),
  username: 'crsong@bupt.edu.cn',
  password: 'jason',
  avatar: 'http://localhost:8080/img/theme/team-1-800x800.jpg',
  nickname: '小明',
  workCount: 10,
  registerCount: 5,
  monitorCount: 3,
  age: 27,
  residence: '北京',
  jobTitle: '自由摄影师',
  self_introduction: '大家好，我是一名自由摄影师小明，很高兴能认识大家，希望大家能够喜欢我的作品',
  allimages: [
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    }
  ],
  registerimages: [
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-4-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
  ],
  monitorimages: [
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-1-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-2-800x800.jpg'
    },
    {
      title: '帅比小明',
      url: 'http://localhost:8080/img/theme/team-3-800x800.jpg'
    }
  ],
  publicKey: keys.publicKey,
  privateKey: keys.privateKey
});
user.save(err => {
  if (err) {
    console.error(err)
  }
})