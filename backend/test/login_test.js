const axios = require('axios')
// axios.post('http://localhost:3000/users/login', {
//   username: 'crsong@bupt.edu.cn',
//   password: 'jason'
// }).then(response => {
//   console.log(response.data)
// })
// console.log(new Date().toISOString())
axios.get('http://localhost:3000/users/getinfo', {params: {token: 'cf3c9706bb2ac367dc5bdc93476071ab'}})
.then(res => {
  console.log(res.data)
})