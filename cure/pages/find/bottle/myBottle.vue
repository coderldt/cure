<template>
	<view class="bottles">
		<view class="content">
			<view class="bottleItem" v-for="(item, index) in list" :key="index">
				<view class="desc">
					{{item.content}}
					<view class="sign" style="color: #f00" v-if="item.bottleId === newBottleId">
						*
					</view>
				</view>
				<view class="replys" v-if="item.replyList.length">
					<view class="title">
						回复评论: 
					</view>
					<view class="replyItem" v-for="(item, index) in item.replyList" :key="index">
						<view class="replyDesc">
							{{item.content}}
						</view>
						<view class="time">
							{{item.createTime}}
						</view>
					</view>
				</view>
				<view class="control">
					<view class="comment" @click="getBottleReplys(item)">
						评论
					</view>
					<view class="addReply" @click="addReply(item)">
						回复
					</view>
					<view class="del" @click="delBottleItem(item)">
						抛出
					</view>
				</view>
			</view>
		</view>
		<u-empty
			mode="data"
			icon="http://cdn.uviewui.com/uview/empty/car.png"
			text="快去捞瓶子吧"
			v-if="!list.length"
		>
		</u-empty>
		<u-popup :show="show" @close="show = false">
			<view class="replyPopop">
				<u-textarea v-model="replyPopup.content" :placeholder="replyPlaceholder"></u-textarea>
				<u-button type="primary" class="btn" @click="submit">回复</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getBottleList,
		getBottleReplyList,
		addReply,
		delBottle
		
	} from '../../../apis/bottle/index.js'
	export default {
		props: {},
		data() {
			return {
				list: [],
				total: 0,
				show: false,
				replyPopup: {
					bottleId: '',
					content: '',
				},
				replyPlaceholder: '',
				newBottleId: ''
			}
		},
		created() {
			this.newBottleId = uni.getStorageSync('newBottleId')
			this.getBottls()
		},
		methods: {
			async getBottls() {
				this.list = [],
					this.total = 0
				const res = await getBottleList()
				if (res.code === 200) {
					this.list = res.data.result.map(i => {
						i.replyList = []
						return i
					})
					this.total = res.data.total
				}
			},
			async getBottleReplys(item) {
				if (item.bottleId === this.newBottleId) {
					this.removeSign()
				}
				const res = await getBottleReplyList({ bottleId: item.bottleId })
				if (res.code === 200) {
					if (!res.data.length) {
						uni.showToast({
							title:'暂无评论内容'
						})
					} else {
						item.replyList = res.data
					}
				} else {
					uni.showToast({
						title:res.msg,
						icon:'error'
					})
				}
			},
			addReply(item) {
				if (item.bottleId === this.newBottleId) {
					this.removeSign()
				}
				this.replyPopup.bottleId = item.bottleId
				this.replyPopup.content = ''
				this.replyPlaceholder = `回复：${item.content}`
				this.show = true
			},
			async submit() {
				const res = await addReply(this.replyPopup)
				if (res.code === 200) {
					uni.showToast({
						title:'回复成功'
					})
					this.show = false
				} else {
					uni.showToast({
						title:res.msg,
						icon:'error'
					})
				}
			},
			async delBottleItem(item) {
				if (item.bottleId === this.newBottleId) {
					this.removeSign()
				}
				const res = await delBottle({ id: item.bottleId })
				if (res.code === 200) {
					uni.showToast({
						title:'抛出成功'
					})
					this.list = this.list.filter(i => i.bottleId !== item.bottleId)
				} else {
					uni.showToast({
						title:res.msg,
						icon:'error'
					})
				}
			},
			removeSign() {
				this.newBottleId = ''
				uni.setStorageSync('newBottleId', '')
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottles {
		min-height: 100vh;
		background: #f6f6f6;
		padding: 20rpx;

		.content {
			.bottleItem {
				position: relative;
				padding: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 15rpx;
				overflow: hidden;
				background-color: #fff;

				.desc {
					display: flex;
					margin-bottom: 20rpx;
					font-size: 30rpx;
					font-weight: 700;
					text-indent: 2em;
					line-height: 1.5em;
				}
				
				.replys {
					
					.title {
						font-weight: 700;
						font-size: 28rpx;
					}
					
					.replyItem {
						position: relative;
						margin-left: 20rpx;
						padding: 20rpx 0 40rpx;
						color: #c1bebe;
						
						.replyDesc {
							color: #000;
							font-size: 28rpx;
						}
						
						.time {
							position: absolute;
							right: 0;
							font-size: 25rpx;
						}
					}
				}

				.control {
					display: flex;
					padding-top: 15rpx;
					font-size: 25rpx;
					color: #a1a1a1;
					border-top: 1px solid #eaeaea;

					.comment,
					.addReply,
					.del {
						flex: 1;
						text-align: center;
					}
				}
			}
		}
	
		.replyPopop {
			padding: 20rpx;
			.btn {
				margin-top: 20rpx;
			}
		}
	}
</style>
