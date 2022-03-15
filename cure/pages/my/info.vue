<template>
	<view class="info">
		<u-collapse
			:value="[1, 2, 3]"
		  >
		    <u-collapse-item
		      title="用户名字"
		      name="Docs guide"
		    >
				<u--input
				    placeholder="请输入内容"
				    border="surround"
				    v-model="userInfo.username"
				  ></u--input>
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
				<u--textarea v-model="userInfo.autograph" placeholder="请输入个性签名" ></u--textarea>
		    </u-collapse-item>
		  </u-collapse>
		  <view class="submitBtn">
			<u-button type="primary" @click="submit">提交</u-button>
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
				userInfo: {},
				defaultImg: ""
			}
		},
		created() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				const userinfo = uni.getStorageSync('userInfo')
				this.userInfo = JSON.parse(userinfo)
				this.defaultImg = this.userInfo.avatar
			},
			upload(val) {
				this.userInfo.avatar = val
			},
			async submit() {
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
	}
</style>
