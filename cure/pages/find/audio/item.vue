<template>
	<view class="audioItem">
		<view class="index">
			{{index + 1}}
		</view>
		<view class="content" @click="onAudioClick">
			<view class="name">
				{{ current.name }}
			</view>
			<view class="author">
				{{current.author || '未知歌手'}}
			</view>
		</view>
		<!-- <audio :src="current.url" :id="String(current.id)" :poster="current.logo" :name="current.name"
			:action="audioAction" controls></audio> -->
		<view class="star">
			<u-icon :name="current.isStar ? 'star-fill' : 'star'" :color="current.isStar ? 'red' : ''" @click="onStar" size="22"></u-icon>
		</view>
	</view>
</template>

<script>
	import { onAudioStar } from '../../../apis/audio/index.js'
	export default {
		props: {
			current: {
				type: Object,
				default: () => ({})
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
			}
		},
		methods: {
			async onStar() {
				const res = await onAudioStar({ audioId: this.current.id })
				if (res.code === 200) {
					this.current.isStar = !!res.data
				}
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				this.$emit('refrensh')
			},
			onAudioClick() {
				this.$emit('onAudioClick', this.index)
			}
		}

	}
</script>

<style scoped lang="scss">
	.audioItem {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 40rpx;
		border-bottom: 4rpx solid #eaeaea;
		// /deep/ .uni-audio-default {
		// 	width: 760rpx;
		// }
		
		.index {
			margin-right: 40rpx;
			color: #dc434d;
			padding-bottom: 10rpx;
			font-size: 38rpx;
			border-bottom: 4rpx solid #8e8e8e;
		}
		
		.content {
			flex: 1;
			
			.name {
				font-size: 32rpx;
				font-weight: 600;
				color: #272727;
				margin-bottom: 10rpx;
			}
			
			.author {
				font-size: 24rpx;
				color: #747474;
			}
		}
	}
</style>
