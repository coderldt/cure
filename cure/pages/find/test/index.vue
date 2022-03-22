<template>
	<view class="test">
		<view class="title">
			请选择一个测试类型进入吧
		</view>
		<view class="types">
			<u-row gutter="10" customStyle="margin-bottom: 10px" v-for="(item, index) in getSliceList" :key="index">
				<u-col span="6" class="typesItem" v-if="item[0]">
					<u-button type="primary" :plain="currentType !== item[0].value" @click="currentType = item[0].value">{{ item[0].label }}</u-button>
				</u-col>
				<u-col span="6" class="typesItem" v-if="item[1]">
					<u-button type="primary" :plain="currentType !== item[1].value" @click="currentType = item[1].value">{{ item[1].label }}</u-button>
				</u-col>
			</u-row>
		</view>
		<view class="btn">
			<u-button type="success" @click="onTestClick">确认</u-button>
		</view>
	</view>
</template>

<script>
	import {
		getTestType
	} from '../../../apis/my/index.js'
	export default {
		data() {
			return {
				typeList: [],
				currentType: '',
			}
		},
		onLoad() {
			this.getType()
		},
		computed: {
			getSliceList() {
				const arr = [];
				for (let i = 0; i < this.typeList.length; i += 2) {
					arr.push(this.typeList.slice(i, i + 2).filter(i => i.value));
				}
				return arr
			}
		},
		methods: {
			async getType() {
				this.typeList = []
				const res = await getTestType()
				if (res.code === 200) {
					this.typeList = res.data
				}
			},
			async onTestClick(item) {
				if (!this.currentType) {
					return uni.showToast({
						title:'请选择一个类型',
						icon:"error"
					})
				}
				uni.navigateTo({
					url:`/pages/find/test/subject?typeId=${this.currentType}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.test {
		min-height: calc(100vh - 66rpx);
		background: #f8f7fc;
		padding: 30rpx 30rpx 0;

		.title {
			font-size: 30rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
		}
		
		.btn {
			position: fixed;
			left: 20rpx;
			right: 20rpx;
			bottom: 20rpx;
		}
	}
</style>
