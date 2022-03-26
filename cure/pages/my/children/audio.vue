<template>
	<view class="star">
		<view class="list"  :style="getListHeight">
			<AudioItem :current="item" :index="index" v-for="(item, index) in list" :key="index" @refrensh="getAudio" @onAudioClick="onAudioClick"></AudioItem>
		</view>
		<Loading v-if="isloading" :isloading="isloading"></Loading>
		<u-empty
			class="empty"
			mode="data"
			icon="http://cdn.uviewui.com/uview/empty/car.png"
			text="暂无数据"
			v-if="!list.length"
		>
		</u-empty>
		<view class="AudioCom">
			<Audio v-if="getCurrentAudio" :key="getCurrentAudio.id" :current="getCurrentAudio"></Audio>
		</view>
	</view>
</template>

<script>
	import { getMyAudio } from '../../../apis/my/index.js'
	import Loading from '../../../components/loading/index.vue'
	import { PROFIX_UPLOAD } from '../../../config/index.js'
	import AudioItem from '../../find/audio/item.vue'
	import Audio from '../../find/audio/audio.vue'
	export default {
		components: {
			Loading,
			Audio,
			AudioItem
		},
		data() {
			return {
				list: [],
				isloading: false,
				currentAudio: null,
			}
		},
		onShow() {
			this.getAudio()
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
					return { 'padding-bottom': '152rpx' } 
				} else {
					return  { 'padding-bottom': '0rpx' } ;
				}
			}
		},
		methods: {
			async getAudio() {
				this.isloading = true
				const res = await getMyAudio() 
				if (res.code === 200) {
					const newList = res.data.result.map(i => {
						i.logo = `${PROFIX_UPLOAD}${i.logo}`
						i.url = `${PROFIX_UPLOAD}${i.url}`
						i.isStar = true
						i.id = i.audioId
						return i
					})
					this.list = res.data.result
				}
				this.isloading = false
			},
			onAudioClick(index) {
				this.currentAudio = index
			},
		}
	}
</script>

<style scoped lang="scss">
	.star {
		min-height: calc(100vh - 90rpx);
		background-color: #fff;
		
		.list {
			border-top: 4rpx solid #f0f0f0;
		}
		
		.AudioCom {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			
			/deep/ .uni-audio-default {
				width: 750rpx;
			}
		}
	}
</style>
