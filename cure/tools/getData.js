import { getLabels } from '../apis/sys.js'
import { starList } from '../apis/home/index.js'

export function getLabel () {
	getLabels().then(res => {
		if (res.code === 200) {
			uni.setStorageSync("labels", JSON.stringify(res.data))
		} else {
			uni.setStorageSync("labels", "")
		}
		
	})
}

export function getStat() {
	starList().then(res => {
		if (res.code === 200) {
			uni.setStorageSync("starts", JSON.stringify(res.data))
		} else {
			
		}
	})
}
const getStat = async () {
	
}

export { getLabel, getStat }