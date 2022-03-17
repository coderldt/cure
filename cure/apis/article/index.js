import axios from '../axios.js'

export function getArticleList (data) {
	return axios.post({ url: '/article/list', data })
}

export function getStarArticle (data) {
	return axios.post({ url: '/user/myArticle', data })
}

export function starArticle (data) {
	return axios.post({ url: '/article/updateArticle', data })
}

export function detail (data) {
	return axios.post({ url: '/article/detail', data })
}
