<template>
	<view class="subjectPolit">
		<view class="progress">
			<u-line-progress :percentage="getPercentage" :showText="false" activeColor="#1a568e">
			</u-line-progress>
			<text class="text">{{current + 1}} / {{ getTabs.length }}</text>
		</view>
		<view class="content" v-if="getSubjectItem" :key="getSubjectItem.id">
			<view class="sTitle">
				{{current + 1}}. {{getSubjectItem.title}}
			</view>
			<view class="sAnswer">
				<u-radio-group
					v-model="getSubjectItem.answer"
					placement="column"
					@change="groupChange"
				  >
					<u-radio
					  :customStyle="{marginBottom: '40rpx'}"
					  v-for="(item, index) in getSubjectItem.answerList"
					  :key="index"
					  :label="item.desc"
					  :name="item.score"
					>
					</u-radio>
				  </u-radio-group>
			</view>
		</view>
		<view class="control">
			<view class="prev" @click="onPrev" v-if="current !== 0">
				上一题
			</view>
			<view class="next" @click="onNext" v-if="(current + 1) !== getTabs.length">
				下一题
			</view>
		</view>
		<view class="btn" v-if="isOk">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import { getSubjectList } from '../../../apis/test/index.js'
	export default {
		data() {
			return {
				typeId: '',
				current: 0,
				subjectList: []
			}
		},
		onLoad(option) {
			this.typeId = option.typeId
			this.getSubject()
		}, 
		computed: {
			getTabs() {
				return this.subjectList.map((i, index) => {
					return {
						name: index + 1,
						value: index + 1,
						badge: {
							isDot: !i.answer
						}
					}
				})
			},
			getSubjectItem() {
				if (!this.subjectList.length) {
					return null
				}
				return this.subjectList[this.current]
			},
			isOk() {
				return this.subjectList.every(i => String(i.answer))
			},
			getPercentage() {
				return ((this.current + 1) / this.getTabs.length) * 100
			}
		},
		methods: {
			async getSubject() {
				this.subjectList = []
				const res = await getSubjectList({ typeId: this.typeId })
				if (res.code === 200) {
					const { answerList, subList } = res.data
					subList.forEach((sub, index) => {
						const { id, title, typeId } = sub[0]
						this.subjectList.push({
							title,
							id,
							typeId,
							answer: '',
							index: index + 1,
							answerList:  answerList.filter(i => i.subjectId === id)
						})
					})
				}
			},
			groupChange(item) {
				if (this.current !== this.subjectList.length - 1) {
					setTimeout(() => {
						this.current += 1
					}, 200)
				}
			},
			onPrev() {
				this.current -= 1
			},
			onNext() {
				this.current += 1
			},
			submit() {
				let score = 0
				this.subjectList.forEach(i => {
					score += i.answer
				})
				uni.redirectTo({
					url:`/pages/find/test/result?typeId=${this.typeId}&score=${score}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.subjectPolit {
		min-height: calc(100vh - 66rpx);
		background: #f8f7fc;
		padding: 30rpx;
		
		.progress {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #b7b3b3;
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			
			.text {
				margin-left: 20rpx;
			}
		}
		
		.content {
			margin-top: 30rpx;
			padding: 30rpx;
			padding-bottom: 0rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			
			.sTitle {
				font-size: 30rpx;
				font-weight: 600;
				margin-bottom: 30rpx;
			}
		}
		
		.control {
			position: relative;
			padding: 20rpx;
			font-size: 14px;
			color: #b7b3b3;
			
			.prev {
				position: absolute;
				left: 20rpx;
				top: 20rpx;
			}
			
			.next {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
			}
		}
		
		.btn {
			position: fixed;
			right: 30rpx;
			bottom: 30rpx;
			width: 200rpx;
		}
	}
</style>
