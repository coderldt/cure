
import axios from '../axios.js'

// 更新用户信息
export function update (data) {
	return axios.post({ url: '/update', data })
}

export function getReplyStar() {
	return axios.post({ url: '/user/getReplyStar' })
}
export function getMyArticle() {
	return axios.post({ url: '/user/myArticle' })
}
export function getMyQuestion() {
	return axios.post({ url: '/user/myQuestions' })
}

// 测试
export function getTestType() {
	let data = { id: 5 }
	return axios.post({ url: '/dictChildren/list', data })
}

export function getTestsType(params) {
	return axios.post({ url: '/dictChildren/list', params })
}

export function getMyTest() {
	return axios.post({ url: '/subject/testHistory' })
}

export function delMyHistory(data) {
	return axios.post({ url: '/testSubject/delHistory', data })
}
