<template>
	<view class="bottle" style="background-image: url(../../../static/bottle/bgc1.png);">
		<view class="control">
			<view class="mybottle" @click="navTo('/pages/find/bottle/myBottle')" style="background-image: url(../../../static/bottle/bottle.png);">
				<view class="text">
					我的瓶子
				</view>
			</view>
			<view class="mybottle" @click="addBottleOfMy" style="background-image: url(../../../static/bottle/fishingNet.png);">
				<view class="text">
					捞一捞
				</view>
			</view>
			<view class="mybottle" @click="show = true" style="background-image: url(../../../static/bottle/bottle1.png);">
				<view class="text">
					扔个瓶子
				</view>
			</view>
		</view>
		<u-popup :show="show" @close="show = false">
			<view class="replyPopop">
				<view class="count">
					今日已抛：{{getCountOfDate}} / 3 个愿望
				</view>
				<u-textarea v-model="replyPopup.content" placeholder="把你想说的话写作这里"></u-textarea>
				<u-button type="primary" :disabled="getCountOfDate === 3" class="btn" @click="submit">回复</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		addMyBottle,
		addBottle
	} from '../../../apis/bottle/index.js'
	export default {
		components: {
		},
		data() {
			return {
				date: String(new Date().toISOString().slice(0, 10)),
				dateCount: {},// 抛瓶子限制
				addBottleCount: {}, // 捞瓶子限制
				showMyBottle: true,
				show: false,
				replyPopup: {
					content: '',
				},
				newBottleId: ''
			}
		},
		created() {
			let count = uni.getStorageSync('dateCount')
			if (count) {
				this.dateCount = JSON.parse(count) || {}
			}
			let addBottleCount = uni.getStorageSync('addBottleCount')
			if (addBottleCount) {
				this.addBottleCount = JSON.parse(addBottleCount) || {}
			}
		},
		computed: {
			getCountOfDate() {
				return this.dateCount[this.date] || 0
			}
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			async addBottleOfMy() {
				let dateCount = this.addBottleCount[this.date]
				if (dateCount) {
					if (dateCount >= 15) {
						return uni.showToast({
							title:'您今天已经捞了15次了，请明天再来',
							icon:'none'
						})
					} else {
						this.addBottleCount[this.date] += 1
					}
				} else {
					this.addBottleCount[this.date] = 1
				}
				const res = await addMyBottle()
				if (res.code !== 200) {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				 } else {
					 uni.setStorageSync('newBottleId', res.data.id)
					 uni.showToast({
					 	title:'您已经捞到了瓶子，快去我的瓶子中查看吧',
						icon:'none'
					 })
				 }
				 uni.setStorageSync('addBottleCount', JSON.stringify(this.addBottleCount))
				 
			},
			async submit() {
				const res = await addBottle(this.replyPopup)
				if (res.code === 200) {
					uni.showToast({
						title:'抛出成功',
					})
					if (this.dateCount[this.date]) {
						this.dateCount[this.date] += 1
					} else {
						this.$set(this.dateCount, this.date, 1)
					}
					uni.setStorageSync('dateCount', JSON.stringify(this.dateCount))
					this.show = false
					this.replyPopup.content = ''
				} else {
					uni.showToast({
						title:res.msg,
						icon:'error'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottle {
		height: 100vh;
		background-color: #93e4ff;
		background-size: cover;
		
		.control {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
		}
		.mybottle {
			position: relative;
			width: 120rpx;
			height: 120rpx;
			background-size: 100% 100%;
			border-radius: 50%;
			box-shadow: inset 2rpx 2rpx 20rpx #fff;
			margin-bottom: 60rpx;
			
			.text {
				position: absolute;
				text-align: center;
				left: calc(50%);
				transform: translateX(-50%);
				color: #707070;
				font-size: 30rpx;
				width: 124rpx;
				font-weight: 700;
				bottom: -20rpx;
			}
		}
	
		.bottles {
			width: 500rpx;
			height: 700rpx;
			background-size: contain;
			background-repeat: no-repeat;
		}
		
		.replyPopop {
			padding: 20rpx;
			.count {
				text-align: right;
				margin: 0 0 10px 0;
				font-size: 13px;
			}
			.btn {
				margin-top: 20rpx;
			}
		}
	}
</style>
