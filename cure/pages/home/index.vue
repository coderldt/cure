<template>
	<view class="home">
		<view class="search">
			<u-search shape="square" height="35" bgColor="#fff" v-model="search" placeholder="搜索问题"
				placeholderColor="#c6c6c4" :actionStyle="{ color: '#fff' }" @search="onSearch" @custom="onSearch">
			</u-search>
		</view>
		<view class="tabs">
			<view class="item" :class="{ activeTab: currentTab === item.value }" v-for="item in tabs" :key="item.value"
				@click="onTabClick(item.value)">
				{{item.label}}
			</view>
		</view>
		<view class="content">
			<List v-if="currentTab === 'recommend'" :startList="startList" ref="List" :search="search"
				:isLogin="isLogin"></List>
			<HotList v-if="currentTab === 'hot'" :startList="startList" ref="HotList" :search="search"
				:isLogin="isLogin"></HotList>
		</view>
		<AddQuestion @addQuestion="addQuestion"></AddQuestion>
		<u-popup :show="show" @close="show = false">
			<view class="replyPopop">
				<u--form labelPosition="left" :model="replyPopup" :rules="rules" ref="form1">
					<u-form-item label="标题" prop="title" borderBottom ref="item1">
						<u--input v-model="replyPopup.title"  placeholder="请输入标题" ></u--input>
					</u-form-item>
					<u-form-item label="标签" prop="label" borderBottom ref="item1">
						<u-checkbox-group
							v-model="replyPopup.label"
							placement="row"
						>
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, index) in labelList"
								:key="index"
								:label="item.label"
								:name="item.value"
							>
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="描述" prop="desc" borderBottom ref="item1">
						<u--textarea v-model="replyPopup.desc" placeholder="请输入描述"></u--textarea>
					</u-form-item>
				</u--form>
				<u-button type="primary" class="btn" @click="submit">发起提问</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import List from './children/List.vue'
	import HotList from './children/hotList.vue'
	import AddQuestion from './children/addQuestion.vue'
	import {
		getLabels
	} from '../../apis/sys.js'
	import {
		starList,
		getMyReply,
		questionAdd
	} from '../../apis/home/index.js'
	import {
		getReplyStar
	} from '../../apis/my/index.js'
	import {
		isLogin
	} from '../../tools/veri.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components: {
			HotList,
			List,
			AddQuestion
		},
		data() {
			return {
				search: "111",
				tabs: [{
						label: '推荐',
						value: 'recommend'
					},
					{
						label: '热门',
						value: 'hot'
					},
				],
				currentTab: "recommend",
				startList: [],
				labelList: [],
				isLogin: false,
				show: false,
				replyPopup: {
					title: '',
					label: [],
					desc: ''
				},
				rules: {
					title: {
						type: 'string',
						required: true,
						message: '标题不能为空',
						trigger: ['blur']
					},
					desc: {
						type: 'string',
						required: true,
						message: '描述不能为空',
						trigger: ['blur']
					},
					label: {
						type: 'array',
						max: 2,
						required: true,
						message: '标签最多能选三个',
						trigger: ['change']
					},
				}
			}
		},
		onShow() {
			this.search = this.title
			this.startList = []
			this.$nextTick(function(){
				if (this.title) {
					this.onSearch()
				}
				this.SAVE_TITLE('')
			})
			this.isLogin = isLogin()
			if (this.isLogin) {
				this.getLabel()
				this.getStarList()
				this.getReply()
				this.getReplyStars()
				this.currentTab = 'recommend'
			} else {
				this.currentTab = 'hot'
			}
		},
		computed: {
			...mapState(['title'])
		},
		methods: {
			...mapMutations(['SAVE_TITLE']),
			onTabClick(val) {
				this.currentTab = val
				if (isLogin()) {
					this.getStarList()
				}
			},
			async getLabel() {
				const res = await getLabels()
				if (res.code === 200) {
					this.labelList = res.data
					uni.setStorageSync("labels", JSON.stringify(res.data))
				}
			},
			async getStarList() {
				const res = await starList()
				if (res.code === 200) {
					this.startList = res.data
					console.log(this.startList);
					uni.setStorageSync("stats", JSON.stringify(res.data))
				}
			},
			async getReply() {
				const res = await getMyReply()
				if (res.code === 200) {
					uni.setStorageSync("reply", JSON.stringify(res.data.result))
				}
			},
			async getReplyStars() {
				const res = await getReplyStar()
				if (res.code === 200) {
					uni.setStorageSync("replyStar", JSON.stringify(res.data))
				}
			},
			onSearch() {
				if (this.currentTab === 'recommend') {
					this.$refs.List.onSearch()
				} else {
					this.$refs.HotList.onSearch()
				}
			},
			addQuestion() {
				if (!this.isLogin) {
					return uni.showToast({
						title: '登录后才可以发起提问',
						icon:"error"
					})
				}
				this.replyPopup = {
					title: '',
					labels: [],
					desc: ''
				},
				this.show = true
			},
			async submit() {
				const vali = await this.$refs.form1.validate()
				if (vali) {
					const res = await questionAdd(this.replyPopup)
					if (res.code === 200) {
						uni.showToast({
							title:'提问成功'
						})
						this.onSearch()
						this.show = false
					} else {
						uni.showToast({
							title:'提问失败',
							icon:"error"
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;
		height: calc(100vh);
		background-color: #f8f8f8;

		.search {
			padding: 40rpx;
			background-color: #6ab5ee;
		}

		.tabs {
			display: flex;
			justify-content: center;
			background-color: #FFFFFF;

			.item {
				flex: 1;
				padding: 30rpx;
				text-align: center;
				color: #94c0d7;
				font-size: 30rpx;
				transition: font-weight .2s;
			}

			.activeTab {
				color: #5d9acc;
				font-weight: 700;
				border-bottom: 2px solid #b4d1e1;
			}
		}

		.content {
			// flex: 1;
			// height: calc(100vh - 144rpx);
			// overflow-y: auto;
		}
	}

	.replyPopop {
		padding: 20rpx;
		.u-checkbox-group {
			flex-wrap: wrap;
			
			.u-checkbox {
				width: 24%;
				margin-right: 1%;
			}
		}

		.btn {
			margin-top: 20rpx;
		}
	}
</style>
