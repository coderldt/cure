<template>
	<view class="replyItem">
		<view class="left">
			<u--image :src="PROFIX_UPLOAD + item.avatar" width="100rpx" height="100rpx" shape="circle" mode="aspectFill" ></u--image>
		</view>
		<view class="right">
			<view class="username">
				{{item.username}}
			</view>
			<view class="content">
				{{ item.content}}
			</view>
			<view class="title"  @click="detail">
				{{ item.questionId ? item.title : '该问题已删除'}}
			</view>
			<view class="time">
				{{item.createTime}}
			</view>
			<view class="control">
				<view class="thumb-up" style="margin-right: 30rpx;">
					<u-icon name="thumb-up" color="'black" :label="item.countReply" size="20"></u-icon>
					<!-- {{item.countReply ? item.countReply : ''}} -->
				</view>
				<u-icon class="trash" name="trash" @click="onTrash" color="#a1a1a1" size="20"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import { mapMutations } from 'vuex'
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
			...mapMutations(['SAVE_TITLE']),
			detail() {
				if (this.item.questionId) {
					this.SAVE_TITLE(this.item.title)
					uni.switchTab({
						url:`/pages/home/index`
					})
				} else {
					uni.showToast({
						title: '该问题已删除',
						icon: "none"
					})
				}
			},
			async onTrash() {
				this.$emit('onTrash', this.item)
			},
		}
	}
</script>

<style scoped lang="scss">
	.replyItem {
		display: flex;
		padding: 32rpx;
		border-bottom: 15rpx solid #efefef;
		
		.left {
			margin-right: 32rpx;
		}
		
		.right {
			position: relative;
			flex: 1;
			.username {
				font-size: 33rpx;
				color: #2d4859;
				margin-bottom: 10rpx;
			}
			
			.title {
				padding: 12rpx 20rpx;
				background-color: #f6f6f6;
				border-radius: 10rpx;
				font-size: 38rpx;
				color: #444444;
			}
			
			.label {
				font-size: 33rpx;
				color: #969495;
			}
			
			.content {
				font-size: 34rpx;
				color: #282828;
				font-weight: 600;
				line-height: 1.4em;
				margin: 30rpx 0;
			}
			
			.time {
				position: absolute;
				right: 0rpx;
				top: 4rpx;
				font-size: 24rpx;
				color: #8d8d8d;
			}
			
			.control {
				display: flex;
				float: right;
				margin-top: 24rpx;
			}
		}
		
		
		// .content {
		// 	flex: 1;
		// 	.title {
		// 		font-weight: 700;
		// 		font-size: 36rpx;
		// 		margin-bottom: 20rpx;
		// 		color: #515151;
		// 	}
			
		// 	.desc {
		// 		font-weight: 30rpx;
		// 		color: #9a9a9a;
		// 		max-height: 250rpx;
		// 		overflow: hidden;
		// 	}
			
		// 	.control {
		// 		display: flex;
		// 		align-items: center;
				
		// 		.time {
		// 			font-size: 24rpx;
		// 			color: #939393;
		// 			flex: 1;
		// 		}
		// 	}
		// }
	}

</style>
