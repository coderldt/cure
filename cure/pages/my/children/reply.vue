<template>
	<view class="reply">
		<view class="count">
			评论 {{count}}
		</view>
		<view class="content">
			<ReplyItem class="replyItem" v-for="(item, index) in list" :key="index" :item="item" @onTrash="onTrash"></ReplyItem>
		</view>
		<view class="contentLoading" v-if="isloading" >
			<Loading :isloading="isloading"></Loading>
		</view>
		<u-empty
			class="empty"
			mode="data"
			icon="http://cdn.uviewui.com/uview/empty/car.png"
			text="暂无数据"
			v-if="!list.length"
		>
		</u-empty>
	</view>
</template>

<script>
	import { getMyReply } from '../../../apis/my/index.js'
	import ReplyItem from './replyitem.vue'
	import { deleteReply } from '../../../apis/home/index.js'
	import Loading from '../../../components/loading/index.vue'
	export default {
		components: {
			ReplyItem,
			Loading
		},
		data() {
			return {
				count: 0,
				list: [],
				isloading: false
			}
		},
		onShow() {
			this.getReply()
		},
		methods: {
			async getReply() {
				this.count = 0
				this.list = []
				this.isloading = true
				const res = await getMyReply()
				if (res.code === 200) {
					this.count = res.data.total
					this.list = res.data.result
				}
				this.isloading = false
			},
			async onTrash(item) {
				const res = await deleteReply({ id: item.id })
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
				this.list = this.list.filter(i => i.id !== item.id)
			},
		}
	}
</script>

<style scoped lang="scss">
	.reply {
		.count {
			padding: 30rpx 40rpx;
			color: #000000;
			font-size: 35rpx;
			font-weight: 600;
			border-bottom: 3rpx solid #f0f0ee;
		}
		
		.contentLoading {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
</style>
