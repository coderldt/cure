<template>
	<view class="item">
		<view class="base">
			<view class="msg">
				<view class="title">
					{{item.title}}
				</view>
				<view class="labels" v-if="getLabels.length">
					<view class="label" v-for="(item, index) in getLabels" :key="index">
						#{{item}}
					</view>
				</view>
				<view class="author">
					<view class="userAvatar">
						<u--image :src="PROFIX_UPLOAD + item.avatar" width="80rpx" height="80rpx" shape="circle" ></u--image>
					</view>
					<view class="username">
						{{item.username}}
					</view>
				</view>
			</view>
			<view class="similar" :class="{ 'isStar': item.isStar }" @click="onSimilarChange(item)">
				<view class="similarCount">
					{{ item.count }}人
				</view>
				<view class="">
					{{ item.isStar ? '已' : '' }}同感
				</view>
			</view>
		</view>
		<view class="desc u-line-2">
			{{item.desc}}
		</view>
		<view class="count">
			<text class="comment"  @click="onCommentChange(item)" :style="{ color: `${ item.commentCount ? '#b1d6eb' : '#eaeaea' }` }">查看评论</text>
			<text class="replying" @click="onReply(item)">回复评论</text>
			<ReplyList class="reply" v-if="item.reply && item.reply.length" :replyList="item.reply" @frensh="frensh"></ReplyList>
		</view>
		<u-popup :show="show" @close="show = false">
			<view class="replyPopop">
				<u-textarea v-model="replyPopup.content" :placeholder="replyPlaceholder"></u-textarea>
				<u-button type="primary" class="btn" @click="reply">回复</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { starUpdate, replyList, addReply } from "../../../apis/home/index.js"
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			isLogin: {
				type: Boolean,
				default: false
			}
		},
		components: {
			// ReplyList,
		},
		data() {
			return {
				labels: [],
				replyStar: [],
				PROFIX_UPLOAD,
				id: '',
				show: false,
				replyPopup: {
					replyId: '',
					content: '',
					questionId: ''
				},
				replyPlaceholder: '',
				replyItem: null
			}
		},
		computed: {
			getLabels() {
				if (this.item.labels.length) {
					const res = []
					const labels = this.item.labels.split(',')
					labels.forEach(label => {
						let labelItem = this.labels.find(i => i.value === label)
						if (labelItem) {
							res.push(labelItem.label)
						}
					})
					return res
				} else {
					return []
				}
			}
		},
		created() {
			this.labels = (JSON.parse(uni.getStorageSync('labels')) || [])
			this.replyStar = (JSON.parse(uni.getStorageSync('replyStar')) || [])
			if (this.isLogin) {
				this.id = JSON.parse(uni.getStorageSync('userInfo')).id
			}
		},
		methods: {
			async onSimilarChange(item) {
				if (this.isLogin) {
					const res = await starUpdate({ questionId: item.id })
					uni.showToast({
						title: res.msg,
					})
					item.isStar = (res.msg === '同感成功')
					item.count += (res.msg === '同感成功' ? 1 : -1)
				} else {
					uni.showToast({
						title: '登录后即可同感',
						icon:"none"
					})
				}
			},
			async onCommentChange(item) {
				if (this.isLogin) {
					if (item.commentCount <= 0) {
						return uni.showToast({
							title: '暂无评论，请你来个评论吧。',
							icon:"none"
						})
					}
					JSON.parse(uni.getStorageSync('userInfo'))
					const res = await replyList({ questionId: item.id })
					item.reply = res.data.map(i => {
						if (i.rUserId === this.id) {
							i.isDel = true
						} else {
							i.isDel = false
						}
						if (this.replyStar.find(reply => reply.replyId === i.id)) {
							i.checked = true
						} else {
							i.checked = false
						}
						if (i.children) {
							i.children.forEach(item => {
								if (item.rUserId === this.id) {
									item.isDel = true
								} else {
									item.isDel = false
								}
								if (this.replyStar.find(reply => reply.replyId === item.id)) {
									item.checked = true
								} else {
									item.checked = false
								}
							})
						}
						return i
					})
				} else {
					uni.showToast({
						title: '登录后即可查看评论',
						icon:"none"
					})
				}
			},
			onReply(item) {
				this.replyPopup.content = ''
				this.replyPopup.replyId = ''
				this.replyPopup.questionId = item.id
				this.replyPlaceholder = `回复：${item.title}`
				this.replyItem = item
				this.show = true 
			},
			async reply() {
				const res = await addReply(this.replyPopup)
				if (res.code === 200) {
					uni.showToast({
						title: '回复成功'
					})
					this.item.commentCount += 1
					this.onCommentChange(this.replyItem)
					this.show = false
				} else {
					uni.showToast({
						title: '回复失败',
						icon:"error"
					})
				}
			},
			frensh() {
				this.onCommentChange(this.item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 1px 1px 9px #cbced1;
		.base {
			display: flex;
			.msg {
				flex: 1;
				
				.title {
					margin-bottom: 20rpx;
					font-size: 30rpx;
					font-weight: 600;
					color: #76a7d2;
				}
				
				.labels {
					display: flex;
					font-size: 25rpx;
					margin-bottom: 15rpx;
					
					.label {
						padding: 5rpx 20rpx;
						border-radius: 8rpx;
						color: #FFFFFF;
						margin-right: 20px;
					}
					
					.label:nth-child(even) {
						background-color: #80bef1;
					}
					
					.label:nth-child(odd) {
						background: linear-gradient(90deg, #feb48a, #ee618d);
					}
				}
				.author {
					display: flex;
					align-items: center;
					font-size: 35rpx;
					color: #da8145;
					margin: 20rpx 0;
					
					.username {
						margin-left: 20rpx;
					}
				}
			}
			
			.similar {
				font-size: 15rpx;
				width: 72rpx;
				height: 72rpx;
				color: #95cbea;
				text-align: center;
				border: 1px solid #95cbea;
				border-radius: 20rpx;
				padding: 20rpx;
				
				.similarCount {
					margin-bottom: 10rpx;
				}
			}
			
			.similar.isStar {
				background: #dbe967;
				color: #fff;
				border-color: #dbe967;
			}
		}
		.desc {
			margin: 0 0 10rpx 0;
			font-size: 30rpx;
			line-height: 1.5em;
			color: #505050;
		}
		
		.count {
			font-size: 28rpx;
			font-weight: 600;
			color: #b1d6eb;
			
			.reply {
				padding-top: 20rpx;
				border-top: 1px solid #eaeaea;
			}
			
			.replying {
				margin-left: 30rpx;
			}
		}
	}
	.replyPopop {
		padding: 20rpx;
		.btn {
			margin-top: 20rpx;
		}
	}
</style>
