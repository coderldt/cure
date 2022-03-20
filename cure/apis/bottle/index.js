import axios from '../axios.js'

export function getBottleList (data) {
	return axios.post({ url: '/bottle/list', data })
}

export function getBottleReplyList (data) {
	return axios.post({ url: '/bottle/dottleReplayList', data })
}

export function addReply (data) {
	return axios.post({ url: '/bottle/reply', data })
}

export function delBottle (data) {
	return axios.post({ url: '/bottle/delete', data })
}

export function addMyBottle () {
	return axios.post({ url: '/bottle/addMyBottle' })
}

export function addBottle (data) {
	return axios.post({ url: '/bottle/add', data })
}
