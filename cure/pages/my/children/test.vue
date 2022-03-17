<template>
	<view class="myTest">
		<view class="content">
			<view class="testItem" v-for="(item, index) in list" :key="index">
				<view class="del">
					<u-icon name="trash-fill" size="25" @click="delHistory(item.id, index)"></u-icon>
				</view>
				<view class="type">
					{{item.label || '类型找不到了'}}
				</view>
				<view class="score">
					<view class="label">
						总分：
					</view>
					<view class="value">
						{{item.score}}
					</view>
				</view>
				<view class="desc">
					<view class="label">
						解析：
					</view>
					<view class="value">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		<Loading v-if="isloading" :isloading="isloading"></Loading>
	</view>
</template>

<script>
	import { getMyTest, delMyHistory } from '../../../apis/my/index.js'
	import Loading from '../../../components/loading/index.vue'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				list: [],
				isloading: false
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async getList() {
				this.isloading = true
				const res = await getMyTest() 
				if (res.code === 200) {
					this.list = res.data
				}
				this.isloading = false
			},
			async delHistory(id, index) {
				const res = await delMyHistory({ id })
				uni.showToast({
					title:res.msg,
					icon:`${res.code === 200 ? 'success' : 'error'}`
				})
				if (res.code === 200) {
					this.list.splice(index, 1)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.myTest {
		min-height: 100vh;
		background: #f6f6f6;
		padding: 20rpx;
		
		.content {
			.testItem {
				position: relative;
				padding: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 15rpx;
				overflow: hidden;
				background-color: #fff;
				.type {
					font-size: 30rpx;
					font-weight: 700;
					margin-bottom: 15rpx;
				}
				
				.score,
				.desc {
					display: flex;
					font-size: 28rpx;
					.label {
						font-size: 600;
					}
					
					.value {
						color: #b4b4b4;
					}
				}
				
				.del {
					position: absolute;
					right: 30rpx;
					top: 30rpx;
				}
			}
			
		}
	}
</style>
