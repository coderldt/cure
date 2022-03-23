<template>
	<view class="star">
		<view class="list">
			<StarItem class="listItem" v-for="(item, index) in list" :key="index" :item="item"></StarItem>
		</view>
		<Loading v-if="isloading" :isloading="isloading"></Loading>
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
	import { getMyArticle } from '../../../apis/my/index.js'
	import Loading from '../../../components/loading/index.vue'
	import StarItem from './starItem.vue'
	export default {
		components: {
			Loading,
			StarItem
		},
		data() {
			return {
				list: [],
				isloading: false
			}
		},
		onShow() {
			this.getArticle()
		},
		methods: {
			async getArticle() {
				this.isloading = true
				const res = await getMyArticle() 
				if (res.code === 200) {
					this.list = res.data.result
				}
				this.isloading = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.star {
		// padding: 24rpx;
		min-height: calc(100vh - 90rpx);
		background-color: #fff;
		
		.list {
			border-top: 4rpx solid #f0f0f0;
		}
		
		// .listItem {
		// 	margin-bottom: 20rpx;
		// }
	}
</style>
