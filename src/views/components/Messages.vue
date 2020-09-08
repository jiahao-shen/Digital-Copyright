<template>
  <section class="container message mt--300">
    <div class="row justify-content-md-center">
      <single-message v-for="(article, index) in articles"
      :key="index"
      :title="article.title"
      :imgurl="article.cover"
      :url="url"
      :date="article.date.toString()"
      :brief_intro="article.brief"
      :id="article._id"
      >
      </single-message>
      <base-button type="primary" @click="goback" class="goback-button">返回</base-button>
    </div>
  </section>
</template>
<script>
import SingleMessage from './singleMessage.vue';
import TinyMise from './tinymise'
export default {
  components: {
    SingleMessage,
    TinyMise
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.articles = info.articles
    console.log(info.articles)
  },
  data() {
    return {
      title: "当当无“狗血”只有书香",
      imgurl: "/img/theme/img-1-1200x1000.jpg",
      url: "article",
      date: "2019-10-25 14:44:05",
      brief_intro: "10月23日深夜，互联网上迎来了今年最大的“瓜”。李国庆和俞渝在社交媒体上互撕的剧情，迅速登上各大热搜，成为网友热...",
      articles: []
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  .message-wrapper {
    padding: 2rem;
    border-radius: .25rem;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    .image-wrapper {
      .message-image {
        width: 30%;
        float: right;
      }
    }
  }
}
.goback-button {
    margin-top: 10vh;
  }
</style>