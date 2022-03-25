<template>
	<view class="audio">
		<view class="headr">
			随机心情
		</view>
		<scroll-view class="content" :style="getListHeight" :scroll-y="true" @scrolltolower="scrolltolower">
			<view class="list">
				<AudioItem :current="item" :index="index" v-for="(item, index) in list" :key="index" @onAudioClick="onAudioClick"></AudioItem>
				<Loading v-if="isloading" :isloading="isloading"></Loading>
				<u-empty
					class="empty"
					mode="data"
					icon="http://cdn.uviewui.com/uview/empty/car.png"
					text="暂无数据"
					v-if="!list.length"
				>
				</u-empty>
			</view>
		</scroll-view>
		<view class="AudioCom" v-if="getCurrentAudio">
			<Audio  :key="getCurrentAudio.id" :current="getCurrentAudio"></Audio>
		</view>
	</view>
</template>

<script>
	import { getList } from '../../../apis/audio/index.js'
	import AudioItem from './item.vue' 
	import {
		isLogin
	} from '../../../tools/veri.js'
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import Loading from '../../../components/loading/index.vue'
	import Audio from './audio.vue'
	export default {
		components: {
			Audio,
			AudioItem,
			Loading
		},
		data() {
			return {
				list: [],
				isLogin: false,
				userId: '',
				total: 0,
				maxPage: 0,
				page: {
					pageNum: 1,
					pageSize: 10
				},
				isloading: false,
				currentAudio: null
			}
		},
		onLoad() {
			this.isLogin = isLogin()
			if (this.isLogin) {
				const userinfo = uni.getStorageSync('userInfo')
				if (userinfo)
				this.userId = String(JSON.parse(userinfo).id)
			} else {
				this.userId = ''
			}
			this.getAudioList()
		},
		beforeCreate() {
			// const domModule = uni.requireNativePlugin('dom')
			// domModule.addRule('fontFace', {
			// 	'fontFamily': "myIconfont",
			// 	'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
			// });
		},
		computed: {
			getCurrentAudio() {
				if (this.currentAudio !== null) {
					return this.list[this.currentAudio]
				} else {
					return null
				}
			},
			getListHeight() {
				if (this.currentAudio) {
					return { height: 'calc(100vh - 390rpx - 142rpx)' } 
				} else {
					return  { height: 'calc(100vh - 390rpx)' } ;
				}
			}
		},
		methods: {
			async getAudioList() {
				this.isloading = true
				const res = await getList({ userId: this.userId, pageNum: this.page.pageNum })
				if (res.code === 200) {
					const { total, pageNum, data } = res.data
					this.total = total
					this.page = {
						pageNum: pageNum,
						pageSize: 10
					}
					const newList = data.map(i => {
						i.logo = `${PROFIX_UPLOAD}${i.logo}`
						i.url = `${PROFIX_UPLOAD}${i.url}`
						return i
					})
					
					this.list = [...this.list, ...newList]
					
					this.maxPage = Math.ceil(total / 5)
					uni.showToast({
						title:'加载成功',
						icon:"none"
					})
				}
				this.isloading = false
			},
			onAudioClick(index) {
				this.currentAudio = index
			},
			scrolltolower() {
				if (this.page.pageNum >= this.maxPage) {
					return uni.showToast({
						title: '没有数据了',
						icon: 'none'
					})
				}
				this.page.pageNum += 1
				this.getAudioList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.audio {
		height: calc(100vh - 90rpx);
		.headr {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 300rpx;
			font-weight: 700;
			font-size: 60rpx;
			font-family: myIconfont;
			color: #fff;
			background: linear-gradient(90deg, #3d6878, #2e677a, #1e647d);
		}
		
		// .content {
		// 	height: calc(100vh - 390rpx);
		// }
		
		.AudioCom {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			
			/deep/ .uni-audio-default {
				width: 750rpx;
			}
		}
	}
</style>
