
import axios from './axios.js'

function getLabels () {
	let data = { id: 16 }
	return axios.post({ url: '/dictChildren/list', data })
}

export { getLabels }