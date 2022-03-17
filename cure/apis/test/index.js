import axios from '../axios.js'

// 获取测试题
export function getSubjectList (data) {
	return axios.post({ url: '/subject/randomTest', data })
}

export function getSubjectResult (data) {
	return axios.post({ url: '/subject/testResult', data })
}

