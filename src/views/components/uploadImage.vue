<template>
  <div class="container mt--300 text-center">
    <h3 class="display-3 text-white">请在此界面上传您的作品</h3>
    <el-upload
      :before-upload="beforeUpload"
      action="#"
      ref="uploadForm"
      :auto-upload="false"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      multiple
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <base-button type="success" class="upload-button" @click="submitUpload">点击上传</base-button>
    <base-button type="primary" class="upload-button" @click="goback">返回</base-button>

    <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
  </div>
  
</template>
<script>
import axios from 'axios'
import ImageDetail from '../components/imageDetail'
export default {
  components: {
    ImageDetail
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      params: {},
      imageInfo: []
    };
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.params = { 'mail': info.mail }
  },
  methods: {
    handleRemove(file, fileList) {
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      // console.log(this.params)
      this.$refs.uploadForm.submit()
      const info = JSON.parse(localStorage.getItem('user-info'))
      const formData = new FormData()
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.fileList.forEach(file => {
        formData.append('files', file)
      })
      formData.append('mail', info.mail)
      
      axios.post('http://10.108.84.79:3000/users/multiUpload', formData, headerConfig).then(res => {
        const data = res.data.data
        console.log(res)
        if(data.upload) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          console.log(data)
          data.imageInfos.forEach(imageInfo => {
            this.imageInfo.push([
              {
                name: '图像ID',
                value: imageInfo._id
              },{
                name: '图像名称',
                value: imageInfo.title
              }, {
                name: 'ipfs哈希值',
                value: imageInfo.ipfs_hash
              }, {
                name: '拥有者',
                value: imageInfo.owner
              }, {
                name: '区块链Transaction ID',
                value: imageInfo.otherInfo.id
              }, {
                name: '交易类型',
                value: imageInfo.otherInfo.operation
              }
            ])
          })
          return this.$store.dispatch('user/getInfo')
        } else {
          if(typeof(data['message']) !== 'undefined') {
            this.$message.error(data['message'])
          } else {
             this.$message.error('上传文件失败')
          }
        }
        
      })
      .then(data => {

      })
      .catch(err => {
        console.log(err)
      })
    },
    beforeUpload(file) {
      this.fileList.push(file)
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-button{
  margin: 2vh auto;
}
</style>