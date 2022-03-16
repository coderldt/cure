<template>
	<view class="reply">
		<view class="replyItem" v-for="(item, index) in replyList" :key="index">
			<view class="avatar">
				<u--image :src="PROFIX_UPLOAD + item.avatar" width="70rpx" height="70rpx" shape="circle" ></u--image>
			</view>
			<view class="content">
				<view class="username">
					{{item.username}}
				</view>
				<view class="desc u-line-2">
					{{item.content}}
				</view>
				<view class="time">
					<view class="date">
						{{item.createTime}}
					</view>
					<view class="control">
						<u-icon :name=" item.checked ? 'thumb-up-fill' : 'thumb-up'" :color="item.checked ? 'red' : 'black'" size="20" @click="updateUserReply(item)"></u-icon>
						{{item.countReply ? item.countReply : ''}}
						<u-icon class="chat" name="chat" v-if="type === 'one'" @click="onReply(item)" color="#a1a1a1" size="20"></u-icon>
						<u-icon v-if="item.isDel" class="trash" name="trash" @click="onTrash(item, index)" color="#a1a1a1" size="20"></u-icon>
					</view>
				</view>
				<view class="replyOfreply" v-if="item.children">
					<ReplyList :replyList="item.children" type="two" @frensh="frensh"></ReplyList>
				</view>
			</view>
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
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import { addReply, updateReply, deleteReply } from '../../../apis/home/index.js'
	export default {
		props: {
			replyList: {
				type: Array,
				default: () => ([])
			},
			type: {
				type: String,
				default: 'one'
			}
		},
		data() {
			return {
				PROFIX_UPLOAD,
				show: false,
				replyPopup: {
					replyId: '',
					content: '',
					questionId: ''
				},
				replyPlaceholder: ''
			}
		},
		methods: {
			onReply({ id, content, questionId }) {
				this.replyPopup.content = ''
				this.replyPopup.replyId = id
				this.replyPopup.questionId = questionId
				this.replyPlaceholder = `回复：${content}`
				this.show = true 
			},
			async reply() {
				const res = await addReply(this.replyPopup)
				if (res.code === 200) {
					uni.showToast({
						title: '回复成功'
					})
					this.$emit('frensh')
					this.show = false
				} else {
					uni.showToast({
						title: '回复失败',
						icon:"error"
					})
				}
			},
			async updateUserReply(item) {
				if (item.checked) {
					if (item.countReply >= 1) {
						item.countReply -= 1
					}
				} else {
					item.countReply += 1
				}
				item.checked = !item.checked
				const res = await updateReply({ replyId: item.id })
				uni.showToast({
					title: res.msg,
					icon: `${res.code === 200 ? 'none' : 'error' }`
				})
			},
			async onTrash(item, index) {
				const res = await deleteReply({ id: item.id })
				uni.showToast({
					title: res.msg,
					icon: `${res.code === 200 ? 'none' : 'error' }`
				})
				this.replyList.splice(index, 1)
			},
			frensh() {
				this.$emit('frensh')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.replyItem {
		display: flex;
		
		.avatar {
			margin-right: 20rpx;
		}
		
		.content {
			flex: 1;
			
			.username {
				color: #784726;
				font-size: 20rpx;
			}
			
			.desc {
				margin: 15rpx 0;
				color: #6f6f6f;
				font-size: 28rpx;
			}
			
			.time {
				display: flex;
				align-items: center;
				color: #989898;
				font-size: 20rpx;
				.date {
					flex: 1;
				}
				
				.control {
					display: flex;
					align-items: center;
					
					.chat {
						margin-left: 10rpx;
					}
				}
			}
			
			.replyOfreply {
				margin-top: 20rpx;
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
