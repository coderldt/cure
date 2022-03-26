<template>
	<view class="articleDetail">
		<view class="">
			<view class="title">
				{{detail.title}}
			</view>
			<view class="star">
				<view class="left">
					<view class="label">
						精选文章
					</view>
					<view class="time">
						{{detail.createTime}}
					</view>
				</view>
				<view class="right">
					<u-icon :name="detail.star ? 'star-fill' : 'star'" :color="detail.star ? 'red' : ''" @click="onStar" size="22"></u-icon>
				</view>
			</view>
			<view class="image" v-if="detail.image" >
				<u--image :src="PROFIX_UPLOAD + detail.image"  ></u--image>
			</view>
			<view class="content" v-html="detail.content">
			</view>
		</view>
		<Loading v-if="isloading" :isloading="isloading"></Loading>
		<u-empty
			class="empty"
			mode="data"
			icon="http://cdn.uviewui.com/uview/empty/car.png"
			text="找不到该文章"
			v-if="!detail.title"
		>
		</u-empty>
	</view>
</template>

<script>
	import { detail, starArticle } from '../../../apis/article/index.js'
	import Loading from '../../../components/loading/index.vue'
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import { isLogin } from '../../../tools/veri.js'
	export default {
		components: {
			Loading
		},
		data() {
			return {
				detail: {},
				isloading: false,
				PROFIX_UPLOAD,
				userId: ''
			}
		},
		onLoad(option) {
			if (isLogin()) {
				const userinfo = uni.getStorageSync('userInfo')
				if (userinfo) {
					this.userId = String(JSON.parse(userinfo).id)
					this.getDetail(option.id)
				}
			} else {
			this.getDetail(option.id)
			}
		},
		methods: {
			async getDetail(id) {
				this.isloading = true
				const res = await detail({ articleId: id, userId: this.userId })
				if(res.code === 200) {
					this.detail = res.data
				}
				this.isloading = false
			},
			async onStar() {
				if (!isLogin()) {
					return uni.showToast({
						title: '登录后才可以收藏哦',
						icon: "none"
					})
				}
				const res = await starArticle({ articleId: this.detail.id })
				if (res.code === 200) {
					this.detail.star = !this.detail.star
				}
				uni.showToast({
					title: res.msg,
					icon: "none"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.articleDetail {
		min-height: calc(100vh - 130rpx);
		padding: 34rpx;
		
		.image {
			display: flex;
			justify-content: center;
			margin: 20rpx 0;
		}
		.title {
			font-size: 44rpx;
			font-weight: 600;
			margin-bottom: 40rpx;
		}
		
		.star {
			display: flex;
			align-items: center;
			margin-bottom: 34rpx;
			
			.left {
				flex: 1;
				
				.time {
					color: #a2a2a2;
					font-size: 30rpx;
				}
			}
		}
		
		.content {
			line-height: 1.7em;
		}
		
		.empty {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
