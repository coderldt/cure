<template>
	<view class="my" style="backgroundImage: url('/static/my/bgc.png')">
		<view class="head" >
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
				<u-icon :name="item.icon" color="#6e6f70" size="25"></u-icon>
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
				console.log(this.userInfo.avatar);
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
		padding: 200rpx 30rpx 0;
		min-height: calc(100vh - 200rpx);
		background-color: #f6f6f6;
		background-size: contain;
		background-repeat: no-repeat;
		.head {
			display: flex;
			margin: 0rpx 30rpx 64rpx;
			
			.avatar {
				margin-right: 30rpx;
			}
			
			.username {
				margin-bottom: 20rpx;
				font-size: 40rpx;
				font-weight: 700;
				color: #48493c;
			}
			
			.autograph {
				font-size: 25rpx;
				color: #fff;
				font-weight: 600;
			}
			
			.info {
				flex: 1;
			}
			.right {
				display: flex;
			}
		}
		
		.options {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
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
