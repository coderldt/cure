
import axios from '../axios.js'

// 更新用户信息
export function update (data) {
	return axios.post({ url: '/update', data })
}
