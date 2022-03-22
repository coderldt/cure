<template>
	<view class="articleItem" @click="detail">
		<view class="content">
			<view class="title">
				{{item.title}}
			</view>
			<view class="desc u-line-2" v-html="item.content" >
			</view>
			<view class="control">
				<text class="time">{{ item.createTime }}</text>
			</view>
		</view>
		<view class="image" >
			<u--image :src="PROFIX_UPLOAD + item.image" width="220rpx" height="200rpx" mode="aspectFill" ></u--image>
		</view>
	</view>
</template>

<script>
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {
				PROFIX_UPLOAD
			}
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
		padding: 32rpx;
		border-bottom: 2rpx solid #f8f8f8;
		
		.image {
			padding-left: 32rpx;
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
