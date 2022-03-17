<template>
	<view class="subjectPolit">
		<view class="title">
			题目选项
		</view>
		<u-tabs :list="getTabs" :current="current" @click="onTabsClick"></u-tabs>
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
				return this.subjectList.every(i => i.answer)
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
				console.log(this.subjectList);
			},
			onTabsClick({index}) {
				this.current = index
			},
			groupChange(item) {
				if (this.current !== this.subjectList.length - 1) {
					this.current += 1
				}
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
		min-height: 100vh;
		background: #eae2d1;
		padding: 30rpx;
		
		>.title {
			font-weight: 700;
			font-size: 30rpx;
		}
		
		.content {
			margin: 40rpx 0 40rpx;
			
			.sTitle {
				font-size: 30rpx;
				font-weight: 600;
				margin-bottom: 30rpx;
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
