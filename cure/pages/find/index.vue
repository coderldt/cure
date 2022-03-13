<template>
	<view class="find">
		<view class="item" v-for="(item, index) in list" :key="index" :style="{ background: item.bgc }">
			<view class="title">
				{{item.title}}
			</view>
			<view class="desc">
				{{item.desc}}
			</view>
			<button :style="{ background: item.btnColor }">{{item.btn}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{ title: '测测你的焦虑类型', desc: '心里测试，测你的焦虑程度', btn: '开始测试', btnColor: "#f09a2b", bgc: "#2d8b9e" },
					{ title: '推送文章', desc: '每日推送优质文章，供你参考', btn: '开始查看', btnColor: "#8858f8", bgc: "#01042a" },
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find {
		margin: 30rpx;
		.item {
			padding: 40rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
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
