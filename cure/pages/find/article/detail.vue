<template>
	<view class="articleDetail">
		<view class="">
			<view class="title">
				{{detail.title}}
			</view>
			<view class="content" v-html="detail.content">
			</view>
		</view>
		<Loading v-if="isloading" :isloading="isloading"></Loading>
		<u-empty
			class="empty"
			mode="data"
			icon="http://cdn.uviewui.com/uview/empty/car.png"
			text="找不到该文章"
			v-if="!detail.title"
		>
		</u-empty>
	</view>
</template>

<script>
	import { detail } from '../../../apis/article/index.js'
	import Loading from '../../../components/loading/index.vue'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				detail: {},
				isloading: false
			}
		},
		onLoad(option) {
			this.getDetail(option.id)
		},
		methods: {
			async getDetail(id) {
				this.isloading = true
				const res = await detail({ articleId: id })
				if(res.code === 200) {
					this.detail = res.data
				}
				this.isloading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.articleDetail {
		min-height: calc(100vh - 130rpx);
		padding: 20rpx;
		.title {
			font-size: 50rpx;
			font-weight: 600;
			text-align: center;
		}
		
		.empty {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
