<template>
	<view class="home">
		<view class="search">
			<u-search shape="square" height="35" bgColor="#fff" v-model="search" placeholder="搜索问题" placeholderColor="#c6c6c4" :actionStyle="{ color: '#fff' }" @search="onSearch" @custom="onSearch" ></u-search>
		</view>
		<view class="tabs">
			<view class="item" :class="{ activeTab: currentTab === item.value }" v-for="item in tabs" :key="item.value" @click="onTabClick(item.value)">
				{{item.label}}
			</view>
		</view>
		<view class="content">
			<List v-if="currentTab === 'recommend'" :startList="startList" ref="List" :search="search" :isLogin="isLogin"></List>
			<HotList v-if="currentTab === 'hot'" :startList="startList" ref="HotList" :search="search"  :isLogin="isLogin"></HotList>
		</view>
		<AddQuestion></AddQuestion>
	</view>
</template>

<script>
	import List from './children/List.vue'
	import HotList from './children/hotList.vue'
	import AddQuestion from './children/addQuestion.vue'
	import { getLabels } from '../../apis/sys.js'
	import { starList } from '../../apis/home/index.js'
	import { isLogin } from '../../tools/veri.js'
	export default {
		components: {
			HotList,
			List,
			AddQuestion
		},
		data() {
			return {
				search: "",
				tabs: [
					{ label: '推荐', value: 'recommend' },
					{ label: '热门', value: 'hot' },
				],
				currentTab: "recommend",
				startList: [],
				isLogin: false
			}
		},
		created() {
			this.startList = []
			this.getLabel()
			if (isLogin()) {
				this.isLogin = true
				this.getStarList()
				this.currentTab = 'recommend'
			} else {
				this.currentTab = 'hot'
			}
		},
		methods: {
			onTabClick(val) {
				this.currentTab = val
				if (isLogin()) {
					this.getStarList()
				}
			},
			async getLabel() {
				const res = await getLabels()
				if (res.code === 200) {
					uni.setStorageSync("labels", JSON.stringify(res.data))
				}
			},
			async getStarList() {
				const res = await starList()
				if (res.code === 200) {
					this.startList = res.data
				}
			},
			onSearch() {
				if (this.currentTab === 'recommend') {
					this.$refs.List.onSearch()
				} else {
					this.$refs.HotList.onSearch()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 182rpx);
		background-color: #f8f8f8;
		
		.search {
			padding: 40rpx;
			background-color: #6ab5ee;
		}
		
		.tabs {
			display: flex;
			justify-content: center;
			background-color: #FFFFFF;
			.item {
				flex: 1;
				padding: 30rpx;
				text-align: center;
				color: #94c0d7;
				font-size: 30rpx;
				transition: font-weight .2s;
			}
			
			.activeTab {
				color: #5d9acc;
				font-weight: 700;
				border-bottom: 2px solid #b4d1e1;
			}
		}
	
		.content {
			// height: calc(100vh - 144rpx - 196rpx - 100rpx);
			// overflow-y: auto;
		}
	}
</style>
