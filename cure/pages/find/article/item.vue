<template>
	<view class="articleItem">
		<view class="image" @click="detail">
			<u--image :src="PROFIX_UPLOAD + item.image" width="220rpx" height="200rpx" mode="aspectFill" ></u--image>
		</view>
		<view class="content">
			<view class="title" @click="detail">
				{{item.title}}
			</view>
			<view class="desc"   @click="detail">
				<view class="" v-html="item.content">
					
				</view>
			</view>
			<view class="control">
				<text class="time">{{ item.createTime }}</text>
				<u-icon :name="item.star ? 'star-fill' : 'star'" :color="item.star ? 'red' : ''" @click="onStar" size="22"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { starArticle } from '../../../apis/article/index.js'
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			isLogin: Boolean
		},
		data() {
			return {
				PROFIX_UPLOAD
			}
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
	display: flex;
	padding: 24rpx;
	border-radius: 20rpx;
	background: #FFFFFF;
	overflow: hidden;
	
	.image {
		padding-right: 24rpx;
	}
	
	.content {
		flex: 1;
		.title {
			font-weight: 700;
			font-size: 36rpx;
			margin-bottom: 20rpx;
			color: #515151;
		}
		
		.desc {
			font-weight: 30rpx;
			color: #9a9a9a;
			max-height: 250rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		
		.control {
			display: flex;
			align-items: center;
			
			.time {
				font-size: 24rpx;
				color: #939393;
				flex: 1;
			}
		}
	}
}
</style>
