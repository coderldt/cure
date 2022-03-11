<template>
	<view class="home">
		<view class="search">
			<u-search shape="square" height="35" bgColor="#fff" v-model="search" placeholder="搜索问题" placeholderColor="#c6c6c4" :actionStyle="{ color: '#fff' }" ></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search: ""
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 40rpx;
		background-color: #6ab5ee;
	}
</style>
