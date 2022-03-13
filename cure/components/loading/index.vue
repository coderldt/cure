<template>
	<view class="loading">
		<u-loading-icon mode="semicircle" :show="isloading"></u-loading-icon>
	</view>
</template>

<script>
	export default {
		props: {
			isloading: {
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
