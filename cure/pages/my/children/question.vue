<template>
	<view class="myQuestion">
		<view class="content">
			<QuestionItem class="questionItem" v-for="(item, index) in questions" :key="index" :item="item"></QuestionItem>
			<u-empty
				class="empty"
				mode="data"
				icon="http://cdn.uviewui.com/uview/empty/car.png"
				text="暂无数据"
				v-if="!questions.length"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	import { getMyQuestion } from '../../../apis/my/index.js'
	import QuestionItem from './questionItem.vue'
	export default {
		components: {
			QuestionItem
		},
		data() {
			return {
				questions: [],
				labels: []
			}
		},
		onLoad() {
			this.getQuestion()
			this.labels = (JSON.parse(uni.getStorageSync('labels')) || [])
		},
		methods: {
			async getQuestion() {
				const res = await getMyQuestion()
				if (res.code === 200) {
					this.questions = res.data
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.myQuestion {
		padding: 24rpx;
		min-height: calc(100vh - 90rpx);
		background-color: #f8f8f8;
		
		.questionItem {
			margin-bottom: 20rpx;
		}
	}
</style>
