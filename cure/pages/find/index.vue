<template>
	<view class="find">
		<view class="item" v-for="(item, index) in list" :key="index" :style="{ background: item.bgc }">
			<view class="title">
				{{item.title}}
			</view>
			<view class="desc">
				{{item.desc}}
			</view>
			<button :style="{ background: item.btnColor }" @click="onItemClick(item)">{{item.btn}}</button>
		</view>
	</view>
</template>

<script>
	import {
		isLogin
	} from '../../tools/veri.js'
	export default {
		data() {
			return {
				list: [
					{ type: 'test', title: '测测你的焦虑类型', desc: '心里测试，测你的焦虑程度', btn: '开始测试', btnColor: "#f09a2b", bgc: "#2d8b9e" },
					{ type: 'article', title: '推送文章', desc: '每日推送优质文章，供你参考', btn: '开始查看', btnColor: "#8858f8", bgc: "#01042a" },
					{ type: 'bottle', title: '遇见漂流瓶', desc: '想你所想，懂你所需', btn: '进入漂流', btnColor: "#18b1d1", bgc: "#93e4ff" },
					{ type: 'audio', title: '舒适音乐', desc: '适时的放松', btn: '进入音乐', btnColor: "#bd7d61", bgc: "#3d6878" },
				],
				isLogin: false
			}
		},
		onShow() {
			if (isLogin()) {
				this.isLogin = true
			} else {
				this.isLogin = false
			}
		},
		methods: {
			onItemClick(item) {
				switch (item.type) {
					case 'test':
						if (this.isLogin) {
							uni.navigateTo({
								url:'/pages/find/test/index'
							})
						} else {
							uni.showToast({
								title:'登录后才可以使用测试功能',
								icon: "none"
							})
						}
						break
					case 'article':
						uni.navigateTo({
							url:'/pages/find/article/index'
						})
						break
					case 'bottle':
						if (this.isLogin) {
							uni.navigateTo({
								url:'/pages/find/bottle/index'
							})
						} else {
							uni.showToast({
								title:'登录后才可以使用漂流瓶功能',
								icon: "none"
							})
						}
						break
					case 'audio':
						uni.navigateTo({
							url:'/pages/find/audio/index'
						})
						break
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find {
		margin: 34rpx;
		.item {
			padding: 40rpx;
			border-radius: 20rpx;
			margin-bottom: 34rpx;
			color: #fff;
			
			.title {
				font-size: 40rpx;
				font-size: 700;
				margin-bottom: 10rpx;
			}
			
			.desc {
				font-size: 30rpx;
				color: #7fb9c7;
				margin-bottom: 20rpx;
			}
			
			button {
				display: inline-block;
				font-size: 20rpx;
				padding: 0rpx 10rpx;
				border-radius: 40rpx;
				line-height: 2.3em;
				color: #fff;
			}
		}
	}
</style>
