<template>
	<view class="">
		<u-upload
			:fileList="list"
			@afterRead="afterRead"
			@delete="deletePic"
			:maxCount="1"
			:previewImage="true"
		></u-upload>
		<u-button @click="startUpload">上传</u-button>
	</view>
</template>

<script>
	import { PROFIX_UPLOAD } from '../../config/index.js'
	import { upload } from '../../apis/upload.js'
	export default {
		props: {
			defaultcImg: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			async afterRead({ file }) {
				this.list.push({
					...file,
					status: 'uploading',
					message: '等待上传中'
				})
				
			},
			deletePic() {
				this.list = []
			},
			async startUpload() {
				if (!this.list.length) {
					return uni.showToast({
						title: '请选择一张图片在上传',
						icon:"error"
					})
				}
				const res = await upload(this.list[0].url)
				const file = this.list[0]
				if (res.code === 200) {
					let url = { url: `${PROFIX_UPLOAD}${res.data}` }
					this.list.splice(0, 1, {
						...file,
						status: '上传成功',
						message: '',
						url
					})
					this.$emit('upload', res.data)
				} else {
					this.list.splice(0, 1, {
						...file,
						status: 'error',
						message: '上传失败',
						url
					})
					this.$emit('upload', '')
				}
			}
		},
		watch: {
			defaultcImg: {
				handler(val) {
					if (val) {
						this.list[0] = { url: `${PROFIX_UPLOAD}${val}` }
					}
				},
				immediate: true
			}
		}
	}
</script>
