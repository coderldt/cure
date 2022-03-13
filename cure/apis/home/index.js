import axios from '../axios.js'

// 问题
export function getHotList (data) {
	return axios.post({ url: '/question/hotList', data })
}

export function getList (data) {
	return axios.post({ url: '/question/list', data })
}

// 问题评论
export function replyList (data) {
	return axios.post({ url: '/reply/list', data })
}


// 同感
export function starUpdate (data) {
	return axios.post({ url: '/star/update', data })
}

export function starList (data) {
	return axios.post({ url: '/star/list', data })
}

// 文章点赞
export function questionUpdate (data) {
	return axios.post({ url: '/question/updateQuestion', data })
}
