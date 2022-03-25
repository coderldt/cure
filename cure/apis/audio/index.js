import axios from '../axios.js'

export function getList (data) {
	return axios.post({ url: '/audio/list', data })
}

export function onAudioStar (data) {
	return axios.post({ url: '/audio/star', data })
}

// export function starArticle (data) {
// 	return axios.post({ url: '/article/updateArticle', data })
// }

// export function detail (data) {
// 	return axios.post({ url: '/article/detail', data })
// }
