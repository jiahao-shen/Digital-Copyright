<template>
	<div>
		<section class="section-profile-cover section-shaped my-0">
			<div class="shape shape-style-1 shape-primary shape-skew alpha-4">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</section>
		<div class="container mt--300 text-center">
			<div class="form-group">
				<div class="row">
					<div class="col-md-3 text-white">文章标题：</div>
					<div class="col-md-9">
							<input type="text" class="form-control form-control-alternative" v-model="title" placeholder="文章标题">
					</div>
				</div>
        <div class="row" style="margin-top:2vh;">
					<div class="col-md-3 text-white">封面图片：</div>
					<div class="col-md-9">
						<input type="text" class="form-control form-control-alternative" v-model="cover" placeholder="封面图片">
					</div>
				</div>
				<div class="row" style="margin-top:2vh;">
					<div class="col-md-3 text-white">文章摘要：</div>
					<div class="col-md-9">
						<input type="text" class="form-control form-control-alternative" v-model="brief" placeholder="文章摘要">
					</div>
				</div>
      </div>
			<tiny-mice @contentChange="contentChange"></tiny-mice>
			<base-button type="primary" class="upload" @click="upload">上传</base-button>
		</div>
	</div>
	 
</template>
<script>
import TinyMice from './components/tinymise'
import axios from 'axios'
export default {
	components: {
		TinyMice
	},
	data() {
		return {
			title: '',
			cover: '',
			content: '',
			brief: ''
		}
	},
	methods: {
		upload() {
			console.log(this.title)
			console.log(this.cover)
			console.log(this.content)
			const info = JSON.parse(localStorage.getItem('user-info'))
			const data = {
				title: this.title,
				brief: this.brief,
				content: this.content,
				to: info.mail,
				cover: this.cover,
				date: Date.now(),
				author: info.nickname
			}
			axios.post('http://10.108.84.79:3000/users/uploadArticle', data)
			.then(res => {
				const data = res.data.data
				if(data.upload) {
					this.$message('上传文章成功')
				}
				else {
					this.$message.error('上传文章失败')
				}
				return this.$store.dispatch('user/getInfo')
			})
			.then(res => {

			})
			.catch(err => {
				this.$message.error('上传文章失败' + err)
			})
		},
		contentChange(content) {
			this.content = content
		}
	}
}
</script>
<style>
.upload {
	margin-top: 5vh;
}
</style>

