<template>
	<view class="item">
		<view class="base">
			<view class="msg">
				<view class="title" @click="detail(item.title)">
					{{item.title}}
				</view>
				<view class="labels" v-if="getLabels.length">
					<view class="label" v-for="(item, index) in getLabels" :key="index">
						#{{item}}
					</view>
				</view>
				<view class="author">
					<view class="userAvatar">
						<u--image :src="PROFIX_UPLOAD + userInfo.avatar" width="80rpx" height="80rpx" shape="circle" ></u--image>
					</view>
					<view class="username">
						{{userInfo.username}}
					</view>
				</view>
			</view>
		</view>
		<view class="desc u-line-2">
			{{item.desc}}
		</view>
	</view>
</template>

<script>
	import { starUpdate, replyList, addReply } from "../../../apis/home/index.js"
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import { mapMutations } from 'vuex'
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
		data() {
			return {
				labels: [],
				PROFIX_UPLOAD,
				userInfo: {},
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
			console.log(this.title);
			this.labels = (JSON.parse(uni.getStorageSync('labels')) || [])
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		},
		methods: {
			...mapMutations(['SAVE_TITLE']),
			detail(title) {
				this.SAVE_TITLE(title)
				uni.switchTab({
					url:`/pages/home/index`
				})
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
		}
		.desc {
			margin: 0 0 10rpx 0;
			font-size: 30rpx;
			line-height: 1.5em;
			color: #505050;
		}
	}
</style>
