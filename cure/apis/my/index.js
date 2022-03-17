
import axios from '../axios.js'

// 更新用户信息
export function update (data) {
	return axios.post({ url: '/update', data })
}

export function getReplyStar() {
	return axios.post({ url: '/user/getReplyStar' })
}

// 测试
export function getTestType() {
	let data = { id: 5 }
	return axios.post({ url: '/dictChildren/list', data })
}

export function getTestsType(params) {
	return axios.post({ url: '/dictChildren/list', params })
}