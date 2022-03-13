function isLogin() {
	const token = uni.getStorageSync('token')
	const userInfo = uni.getStorageSync('userInfo')
	
	if (token && userInfo) {
		return true
	} else 
	return false
}

export { isLogin }