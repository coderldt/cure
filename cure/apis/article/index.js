import axios from '../axios.js'

export function getArticleList (data) {
	return axios.post({ url: '/article/list', data })
}

