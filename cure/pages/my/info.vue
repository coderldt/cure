<template>
	<view class="info">
		<u-collapse
		  >
		    <u-collapse-item
		      title="用户名字"
		      name="Docs guide"
		    >
				<u--input
				    placeholder="请输入内容"
				    border="surround"
				    v-model="userInfo.username"
					maxlength="8"
				  ></u--input>
				  <view class="limit">用户名字最长8个字符</view>
		    </u-collapse-item>
		    <u-collapse-item
		      title="个性头像"
		      name="Variety components"
		    >
				<StartUpload :defaultcImg="defaultImg" @upload="upload"></StartUpload>
		    </u-collapse-item>
		    <u-collapse-item
		      title="个人签名"
		      name="Numerous tools"
		    >
				<u--textarea v-model="userInfo.autograph" maxlength="35" count placeholder="请输入个性签名" ></u--textarea>
		    </u-collapse-item>
		  </u-collapse>
		  <view class="submitBtn">
			<u-button type="primary" :loading="isLoading" @click="submit">提交</u-button>
		  </view>
	</view>
</template>

<script>
	import StartUpload from '../../components/upload/upload.vue'
	import { update } from '../../apis/my/index.js'
	export default {
		components: {
			StartUpload
		},
		data() {
			return {
				userInfo: {
					username: '',
					autograph: ''
				},
				isLoading: false,
				defaultImg: ""
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				const userinfo = uni.getStorageSync('userInfo')
				if (userinfo) {
					const { username, autograph, id } = JSON.parse(userinfo)
					if (username) {
						this.userInfo.username = (username || '')
					}
					if (autograph) {
						this.userInfo.autograph = (autograph || '')
					}
					this.userInfo.id = id
					this.defaultImg = this.userInfo.avatar
				}
			},
			upload(val) {
				this.userInfo.avatar = val
			},
			async submit() {
				this.isLoading = true
				const res = await update(this.userInfo)
				if (res.code === 200) {
					console.log(this.userInfo);
					uni.setStorageSync("userInfo", JSON.stringify(this.userInfo))
					uni.showToast({
						title:"信息更新成功",
						success() {
							uni.navigateBack({
								delta:1
							})
							
						}
					})
				} else {
					uni.showToast({
						title:res.msg,
						icon:'error'
					})
				}
				this.isLoading = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		padding-top: 30rpx;
		
		.submitBtn {
			position: fixed;
			left: 40rpx;
			right: 40rpx;
			bottom: 40rpx;
		}
		
		.limit {
			text-align: right;
			color: #cfcfcf;
		}
	}
</style>
