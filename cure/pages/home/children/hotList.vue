<template>
	<scroll-view style="height: calc(100vh - 244rpx);" :scroll-y="true" @scrolltolower="scrolltolower">
		<view class="hotList">
			<Item class="item" v-for="(item, index) in list" :key="index" :item="item" :isLogin="isLogin"></Item>
			<Loading v-if="isloading" :isloading="isloading"></Loading>
		</view>
	</scroll-view>
</template>

<script>
	import Item from './item.vue'
	import Loading from '../../../components/loading/index.vue'
	import { getHotList } from '../../../apis/home/index.js'
	export default {
		props: {
			search: String,
			isLogin: Boolean
		},
		components: {
			Item,
			Loading
		},
		data() {
			return {
				list: [],
				page: {
					pageNum: 1,
					total: 0,
					maxPage: 0
				},
				isloading: false
			}
		},
		created() {
			this.$nextTick(function(){
				this.getList()
			})
		},
		methods: {
			async getList() {
				this.isloading = true
				const res = await getHotList({ title: this.search, pageNum: this.page.pageNum })
				if (res.code === 200) {
					const { data, pageNum, total } = res.data
					const newList = data
					this.list = this.list.concat(newList)
					this.page.pageNum = pageNum
					this.page.total = total
					this.page.maxPage = Math.ceil(total / 5)
					uni.showToast({
						title: '加载成功',
						icon: "none"
					})
				}
				this.isloading = false
			},
			onSearch() {
				this.page.pageNum = 1
				this.list = []
				this.getList()
			},
			scrolltolower() {
				if (this.page.pageNum >= this.page.maxPage) {
					return uni.showToast({
						title: '没有数据了',
						icon: 'none'
					})
				}
				this.page.pageNum += 1
				this.getList()
			},
		},
	}
</script>

<style lang="scss">
	.hotList {
		position: relative;
		padding: 24rpx;
		.item {
			margin-bottom: 20rpx;
		}
	}
</style>
