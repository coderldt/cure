<template>
	<view class="articleItem">
		<view class="title" @click="detail">
			{{item.title}}
		</view>
		<view class="desc" v-html="item.content"  @click="detail">
		</view>
		<view class="control">
			<u-icon :name="item.star ? 'star-fill' : 'star'" :color="item.star ? 'red' : ''" @click="onStar" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	import { starArticle } from '../../../apis/article/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			isLogin: Boolean
		},
		methods: {
			async detail() {
				uni.navigateTo({
					url:`/pages/find/article/detail?id=${this.item.id}`
				})
			},
			async onStar() {
				if (!this.isLogin) {
					return uni.showToast({
						title: '登录后才可以收藏哦',
						icon: "none"
					})
				}
				const res = await starArticle({ articleId: this.item.id })
				if (res.code === 200) {
					this.item.star = !!res.data
				}
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.articleItem {
	padding: 20rpx;
	border-radius: 20rpx;
	background: #FFFFFF;
	overflow: hidden;
	
	.title {
		font-weight: 700;
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}
	
	.desc {
		max-height: 250rpx;
		overflow: hidden;
	}
	
	.control {
		float: right;
	}
}
</style>
