<template>
	<view class="article">
		<view class="search">
			<u-search shape="square" height="35" bgColor="#fff" v-model="search" placeholder="搜索问题"
				placeholderColor="#c6c6c4" :actionStyle="{ color: '#fff' }" @search="onSearch" @custom="onSearch">
			</u-search>
		</view>
		<view class="content">
			<scroll-view style="height: calc(100vh - 188rpx);" :scroll-y="true" @scrolltolower="scrolltolower">
				<view class="list">
					<Item class="item" v-for="(item, index) in list" :key="index" :item="item" :isLogin="isLogin"></Item>
					<Loading v-if="isloading" :isloading="isloading"></Loading>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getArticleList, getStarArticle } from '../../../apis/article/index.js'
	import Loading from '../../../components/loading/index.vue'
	import {
		isLogin
	} from '../../../tools/veri.js'
	import Item from './item.vue'
	export default {
		components: {
			Loading,
			Item
		},
		data() {
			return {
				search: '',
				list: [],
				total: 0,
				maxPage: 0,
				page: {
					pageNum: 1,
					pageSize: 5
				},
				starArticle: [],
				isloading: false,
				isLogin: false,
				userId: ''
			}
		},
		onShow() {
			this.list = []
			this.page.pageNum = 1
			this.isLogin = isLogin()
			if (this.isLogin) {
				const userinfo = uni.getStorageSync('userInfo')
				if (userinfo)
				this.userId = String(JSON.parse(userinfo).id)
			}
			this.getTest()
		},
		methods: {
			onSearch() {
				this.list = []
				this.page.pageNum = 1
				this.getTest()
			},
			async getTest() {
				this.isloading = true
				const res = await getArticleList({ ...this.page, title: this.search, userId: this.userId })
				if (res.code === 200) {
					const { total, pageNum, pageSize, result } = res.data
					this.total = total
					this.page = {
						pageNum: pageNum,
						pageSize
					}
					let newList = result
					this.list = this.list.concat(newList)
					this.maxPage = Math.ceil(total / 5)
					uni.showToast({
						title:'加载成功',
						icon:"none"
					})
				}
				this.isloading = false
			},
			async getStarArt() {
				this.starArticle = []
				const res = await getStarArticle()
				if (res.code === 200) {
					this.starArticle = res.data.result
				}
			},
			scrolltolower() {
				if (this.page.pageNum >= this.maxPage) {
					return uni.showToast({
						title: '没有数据了',
						icon: 'none'
					})
				}
				this.page.pageNum += 1
				this.getTest()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 90rpx);
		background-color: #f8f8f8;
		
		.search {
			padding: 40rpx;
			background-color: #6ab5ee;
		}
		
		.content {
			margin: 24rpx;
			
			.item {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
