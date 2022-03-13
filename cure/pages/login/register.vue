<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册治舆</view>
			<input class="u-border-bottom phone" type="number" v-model="tel" placeholder="请输入手机号" />
			<input class="u-border-bottom password" type="password" v-model="password" placeholder="请输入密码" />
			
			<view class="btn">
				<u-button type="primary" @click="submit" :loading="loading">注册</u-button>
			</view>
		</view>
		<view class="buttom">
			<view class="hint">
				注册代表同意
				<text class="link">治舆点评用户协议、隐私政策，</text>
				并授权使用您的治舆信息（如昵称、头像）以便您统一管理。
			</view>
		</view>
	</view>
</template>

<script>
	import { register } from '../../apis/login.js'
export default {
	data() {
		return {
			tel: '',
			password: "",
			loading: false
		}
	},
	methods: {
		async submit() {
			if(!this.$u.test.mobile(this.tel)) {
				return uni.showToast({
					title: '请输入正确的手机号',
					duration: 2000,
					icon: "none"
				});
			} 
			
			if (!this.password) {
				return uni.showToast({
					title: '密码不能为空',
					duration: 2000,
					icon: "none"
				});
			}
			
			this.loading = true
			const res = await register({ phone: this.tel, password: this.password })
			if (res.code === 200) {
				uni.showToast({
					title: res.msg,
					duration: 1500,
					icon: "none",
				});
				setTimeout(() => {
						uni.navigateTo({
							url:"/pages/login/login"
						})
				}, 1500)
			} else {
				uni.showToast({
					title: res.msg,
					duration: 2000,
					icon: "none",
				});
			}
			this.loading = false
		},
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		
		.phone,
		.password {
			margin-bottom: 30rpx;
		}
		.btn {
			margin-top: 100rpx;
			
			.login {
				margin-bottom: 30rpx;
			}
		}
	}
	.buttom {
		position: absolute;
		bottom: 40px;
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: #909399;
		}
	}
}
</style>
