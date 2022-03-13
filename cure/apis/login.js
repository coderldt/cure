
import axios from './axios.js'

export function login (data) {
	return axios.post({ url: '/login', data })
}

export function register (data) {
	return axios.post({ url: '/register', data })
}
