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
			<List v-if="currentTab === 'recommend'" ref="List" :search="search" :userId="userId"
				:isLogin="isLogin"></List>
			<HotList v-if="currentTab === 'hot'" ref="HotList" :search="search" :userId="userId"
				:isLogin="isLogin"></HotList>
		</view>
		<AddQuestion @addQuestion="addQuestion"></AddQuestion>
		<u-popup :show="show" @close="show = false">
			<view class="replyPopop">
				<u--form labelPosition="left" :model="replyPopup" :rules="rules" ref="form1">
					<u-form-item label="标题" prop="title" borderBottom ref="item1">
						<u--input v-model="replyPopup.title"  placeholder="请输入标题" ></u--input>
					</u-form-item>
					<u-form-item label="标签" prop="label" borderBottom ref="item1" :style="">
						
						<u-checkbox-group
							v-model="replyPopup.label"
							placement="row"
						>
							<!-- <u-row customStyle="margin-bottom: 10px" v-for="(item, index) in labelList" :key="index">
								<u-col :span="6" v-for="(i, idx) in item" :key="idx">
									<u-checkbox
										:customStyle="{marginBottom: '4px'}"
										:label="i.label"
										:name="i.value"
										v-model="replyPopup.label"
									>
									</u-checkbox>
								</u-col>
							</u-row> -->
							<u-checkbox
								:customStyle="{marginBottom: '4px'}"
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
				userId: '',
				search: "",
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
						max: 3,
						required: true,
						message: '标签最多能选三个',
						trigger: ['change']
					},
				}
			}
		},
		onShow() {
			this.search = this.title
			this.$nextTick(function(){
				if (this.title) {
					this.onSearch()
				}
				this.SAVE_TITLE('')
				// this.search = ''
			})
			this.isLogin = isLogin()
			if (this.isLogin) {
				const userinfo = uni.getStorageSync('userInfo')
				if (userinfo)
				this.userId = String(JSON.parse(userinfo).id)
				this.getLabel()
				this.currentTab = 'recommend'
			} else {
				this.currentTab = 'hot'
				this.userId = ''
			}
		},
		computed: {
			...mapState(['title'])
		},
		methods: {
			...mapMutations(['SAVE_TITLE']),
			onTabClick(val) {
				this.currentTab = val
			},
			async getLabel() {
				const res = await getLabels()
				if (res.code === 200) {
					// let i = 0
					// for(i; i < res.data.length; i += 3) {
					// 	this.labelList.push(res.data.slice(i, i + 3))
					// }
					this.labelList = res.data
					console.log(res, this.labelList);
					uni.setStorageSync("labels", JSON.stringify(res.data))
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
						icon:"none"
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
				if (!this.isLogin) {
					return uni.showToast({
						title: '登录后才可以发起提问',
						icon:"none"
					})
				}
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
	}

	.replyPopop {
		padding: 20rpx;
		.u-checkbox-group {
			flex-wrap: wrap;
			flex-shrink: 1;
			
			.u-checkbox {
				width: 33%;
			}
		}

		.btn {
			margin-top: 20rpx;
		}
	}
</style>
