<template>
	<view class="testResult">
		<view class="title">
			测试最终结果
		</view>
		<view class="form">
			<view class="formItem">
				<view class="label">
					最终分数：
				</view>
				<view class="value">
					{{msg.score}}
				</view>
			</view><view class="formItem">
				<view class="label">
					分数解析：
				</view>
				<view class="value">
					{{msg.result}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getSubjectResult } from '../../../apis/test/index.js'
	export default {
		data() {
			return {
				msg: {}
			}
		},
		onLoad(option) {
			this.getResult(option)
		},
		methods: {
			async getResult({typeId, score}) {
				const res = await getSubjectResult({ typeId, score })
				if (res.code === 200) {
					this.msg = res.data
				} else {
					uni.showToast({
						title:res.msg,
						icon: "none",
						duration:2500
					})
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.testResult {
		min-height: 100vh;
		background: #eae2d1;
		padding: 30rpx;
		>.title {
			font-weight: 700;
			font-size: 30rpx;
			margin-bottom: 30rpx;
		}
		
		.form {
			.formItem {
				display: flex;
				margin-bottom: 30rpx;
				font-size: 28rpx;
				.label {
					width: 150rpx;
					font-weight: 600;
				}
				.value {
					flex: 1;
					color: #626262;
				}
			}
		}
	}
</style>