<template>
  <el-upload
    class="avatar-uploader"
    action=""
    ref="upload"
    :http-request="upload" 
    multiple
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="upload-avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    padding-top: 45%;
    text-align: center;
  }
  .upload-avatar {
    max-width: 100%;
    height: 178px;
    display: block;
  }
</style>

<script>
import { uploadAvatar } from '../api/user'
  export default {
    created: function() {
      const info = JSON.parse(localStorage.getItem('user-info'))
      this.imageUrl = info.avatar
      this.mail = info.mail
    },
    data() {
      return {
        imageUrl: '',
        mail: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      upload() {
        const formData = new FormData()
        const file = this.$refs.upload.uploadFiles[0]
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }}
        if (!file) { // 若未选择文件
          alert('请选择文件')
          return
        }
        formData.append('avatar', file.raw)
        formData.append('mail', this.mail)
        uploadAvatar(formData)
        .then(res => {
          this.imageUrl = URL.createObjectURL(file.raw);
          return this.$store.dispatch('user/getInfo')
        })
        .catch(err => {
          this.$message.error('上传用户头像失败！')
        })
      }
    }
  }
</script>