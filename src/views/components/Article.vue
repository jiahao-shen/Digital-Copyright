<template>
  <div class="container mt--300 article">
    <card>
      <h2 slot="header">侵权提醒</h2>
      <div v-html="content" class="text-center col-md-12"></div>
      <!-- <div class="text-center col-md-12">
        <p>经过系统检测有一个图片和您的版权图片高度重合，被侵权图片为：</p>
          <div class="col-md-12 text-center">
            
            <img src="http://10.108.84.79:3000/images/files-1574349076468-red-cabbage-4637426_1920.jpg" alt="" style="max-width: 80%;">
          </div>
          <p>侵权网址为：<a href="www.baidu.com">www.baidu.com</a></p>
          <p>请您及时维权</p>
      </div> -->
      <template slot="footer">
        <div class="row justify-content-center">
          <base-button type="success" @click="goback">返回</base-button>
        </div>
      </template>
    </card>
    
  </div>
</template>
<script>
import Card from '../../components/Card'
export default {
  components: {
    Card
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    info.articles.forEach(article => {
      if(article._id === this.$route.params.id) {
        this.content = article.content
      }
    })
  },
  props: {
    title: {
      type: String,
      description: 'The title of the article'
    },
    brief: String,
    date: Date,
    images: [Object],
    cover: String
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    goback() {
      this.$router.go(-2)
    }
  }
}
</script>
<style scoped>
.article-images {
  max-width: 90%;
  margin: 0 auto;
}
</style>