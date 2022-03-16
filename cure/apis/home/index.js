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

export function questionAdd (data) {
	return axios.post({ url: '/question/add', data })
}

// 点赞评论
export function updateReply (data) {
	return axios.post({ url: '/reply/updateReply', data })
}

// 回复评论
export function addReply (data) {
	return axios.post({ url: '/reply/add', data })
}
export function deleteReply (data) {
	return axios.post({ url: '/reply/delete', data })
}

export function getMyReply () {
	return axios.post({ url: '/user/myReply' })
}
