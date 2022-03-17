<template>
	<view class="articleItem">
		<view class="title">
			{{item.title}}
		</view>
		<view class="desc">
			<view class="" v-html="item.content">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			isLogin: Boolean
		}
	}
</script>

<style scoped lang="scss">
.articleItem {
	padding: 20rpx;
	border-radius: 20rpx;
	background: #FFFFFF;
	max-height: 600rpx;
	overflow: hidden;
	
	.title {
		font-weight: 700;
		font-size: 35rpx;
	}
}
</style>
