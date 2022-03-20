<template>
	<view class="articleItem">
		<view class="title" @click="detail">
			{{item.title}}
		</view>
		<u-icon name="arrow-right-double" size="20"></u-icon>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
		},
		methods: {
			async detail() {
				uni.navigateTo({
					url:`/pages/find/article/detail?id=${this.item.articleId}`
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.articleItem {
	display: flex;
	align-items: center;
	padding: 20rpx;
	border-radius: 20rpx;
	background: #FFFFFF;
	overflow: hidden;
	
	.title {
		flex: 1;
		font-weight: 700;
		font-size: 36rpx;
	}
}
</style>
