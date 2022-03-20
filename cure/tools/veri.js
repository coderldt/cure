function isLogin() {
	const token = uni.getStorageSync('token')
	const userInfo = uni.getStorageSync('userInfo')
	
	if (token && userInfo) {
		return true
	} else 
	return false
}

function clearStore () {
	uni.removeStorageSync('token')
	uni.removeStorageSync('userInfo')
	uni.removeStorageSync('labels')
	uni.removeStorageSync('reply')
	uni.removeStorageSync('replyStar')
	uni.removeStorageSync('stats')
}

export { isLogin, clearStore }