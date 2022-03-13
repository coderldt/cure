<template>
	<view class="my" style="backgroundImage: url('/static/my/bgc.png')">
		<view class="head" >
			<view class="avatar">
				<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="130rpx" height="130rpx" shape="circle" ></u--image>
			</view>
			<view class="info">
				<view class="username">
					{{ userInfo.username || '暂无信息' }}
				</view>
				<view class="autograph u-line-2">
					{{ userInfo.autograph || '暂无填写' }}
				</view>
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
	import { isLogin } from '../../tools/veri.js'
	export default {
		data() {
			return {
				list: [
					{ label: '我发布的', icon: "coupon-fill", value: 'coupon' },
					{ label: '我评论的', icon: "edit-pen-fill", value: 'editPen' },
					{ label: '我收藏的', icon: "star-fill", value: 'star' },
					{ label: '我的测试', icon: "file-text-fill", value: 'file' },
					{ label: '设置', icon: "setting-fill", value: 'setting' },
				],
				userInfo: {}
			}
		},
		onLoad() {

		},
		created() {
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
			}
		},
		methods: {
			getDetail() {
				const userinfo = uni.getStorageSync('userInfo')
				this.userInfo = JSON.parse(userinfo)
			},
			onOptions(item) {
				switch(item.value) {
					case 'coupon':
						break
					case 'editPen':
						break
					case 'star':
						break
					case 'file':
						break
					case 'setting':
						break
				}
				console.log(item);
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
