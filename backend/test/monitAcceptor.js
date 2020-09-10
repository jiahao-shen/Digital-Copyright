const axios = require('axios');
const reqData = {
	url: 'https://www.baidu.com/',
	phash: ['072e1c3c3ce0cc0b', '287c7c60fe0080fc'],
};
axios
	.post('http://127.0.0.1:3000/users/monitAcceptor', reqData)
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => {
		console.log(err);
	});
