import axios from './axios.js'
import { BASE_URL } from '../config/index.js'

function upload (url) {
	const header = {}
	let token = uni.getStorageSync('token')
	token && (header.token = token)
	
	return new Promise(( resolve, reject ) => {
		uni.uploadFile({
			url: `${BASE_URL}/upload`,
			filePath: url,
			name: 'file',
			header,
			success(res) {
				resolve(JSON.parse(res.data))
			},
			fail() {
				reject({ code: 401 })
			}
		})
	})
}

export { upload }