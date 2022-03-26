<template>
	<view class="my" >
		<view class="head" style="backgroundImage: url('/static/my/bgc2.jpg')">
			<view class="avatar">
				<u--image :src="userInfo.avatar" width="130rpx" height="130rpx" shape="circle" ></u--image>
			</view>
			<view class="info">
				<view class="username">
					{{ userInfo.username || '暂无信息' }}
				</view>
				<view class="autograph u-line-2">
					{{ userInfo.autograph || '暂无填写' }}
				</view>
			</view>
			<view class="right" @click="switchUpdateInfo">
				<u-icon name="arrow-right" color="#6e6f70" size="25"></u-icon>
			</text>
			</view>
		</view>
		<view class="options" v-for="(item, index) in list" @click="onOptions(item)" :key="index" >
			<text class="icon">
				<u-icon :name="item.icon" color="#fcd515" size="25"></u-icon>
			</text>
			<text class="content">{{item.label}}</text>
			<u-icon name="arrow-right" color="#b5b5b5" size="20"></u-icon>
		</view>
	</view>
</template>

<script>
	import { isLogin, clearStore } from '../../tools/veri.js'
	import { PROFIX_UPLOAD } from '../../config/index.js'
	import { getLabels } from '../../apis/sys.js'
	export default {
		data() {
			return {
				list: [
					{ label: '我发布的', icon: "coupon-fill", value: 'coupon' },
					{ label: '我评论的', icon: "edit-pen-fill", value: 'editPen' },
					{ label: '我收藏的', icon: "star-fill", value: 'star' },
					{ label: '我的音乐', icon: "volume-fill", value: 'volume' },
					{ label: '我的测试', icon: "file-text-fill", value: 'file' },
					{ label: '退出登录', icon: "error-circle", value: 'loginOut' },
					// { label: '设置', icon: "setting-fill", value: 'setting' },
				],
				userInfo: {},
				PROFIX_UPLOAD
			}
		},
		onShow() {
			if (!isLogin()) {
				uni.showToast({
					title: '请先登录',
					duration: 2000,
				})
				setTimeout(() => {
					uni.navigateTo({
						url:"/pages/login/login",
					})
				}, 2000)
			} else {
				this.getDetail()
				this.getLabel()
			}
		},
		methods: {
			getDetail() {
				const userinfo = uni.getStorageSync('userInfo')
				this.userInfo = JSON.parse(userinfo)
				this.userInfo.avatar = `${PROFIX_UPLOAD}${this.userInfo.avatar}`
			},
			async getLabel() {
				const res = await getLabels()
				if (res.code === 200) {
					this.labelList = res.data
					uni.setStorageSync("labels", JSON.stringify(res.data))
				}
			},
			onOptions(item) {
				switch(item.value) {
					case 'coupon':
						uni.navigateTo({
							url:'/pages/my/children/question'
						})
						break
					case 'editPen':
						uni.navigateTo({
							url:'/pages/my/children/reply'
						})
						break
					case 'star':
						uni.navigateTo({
							url:'/pages/my/children/star'
						})
						break
					case 'file':
						uni.navigateTo({
							url:'/pages/my/children/test'
						})
						break
					case 'loginOut':
						this.logOut()
						break
					case 'volume':
						uni.navigateTo({
							url:'/pages/my/children/audio'
						})
						break
				}
			},
			logOut() {
				clearStore()
				this.userInfo = {}
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			switchUpdateInfo() {
				uni.navigateTo({
					url:'/pages/my/info'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my {
		min-height: calc(100vh);
		background-color: #f6f6f6;
		.head {
			display: flex;
			padding: 200rpx 60rpx 64rpx;
			background-size: cover;
			background-position: center; 
			background-repeat: no-repeat;
			
			.avatar {
				margin-right: 30rpx;
			}
			
			.username {
				margin-bottom: 20rpx;
				font-size: 40rpx;
				font-weight: 700;
				color: #fff;
			}
			
			.autograph {
				font-size: 25rpx;
				color: #fff;
				font-weight: 600;
			}
			
			.info {
				flex: 1;
				padding: 0 30rpx;
			}
			.right {
				display: flex;
			}
		}
		
		.options {
			display: flex;
			align-items: center;
			margin: 30rpx;
			// margin-bottom: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			color: #bbbbbb;
			.icon {
				margin-right: 20rpx;
			}
			.content {
				flex: 1;
			}
		}
	}
</style>
