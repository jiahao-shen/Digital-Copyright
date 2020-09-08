<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row justify-content-center">
                            <div class="col-md-12 text-center">
                                <h1 class="text-white">Hypercool版权市场
                                    <!-- <span>completed with examples</span> -->
                                </h1>
                                <!-- <p class="lead  text-white">The design system comes with four pre-built pages to help
                                    you get started faster. You can change the text and images and you're good to
                                    go.</p> -->
                                <base-input placeholder="请输入您想要找的图片" class="lead" addon-right-icon="ni ni-zoom-split-in">
                                    
                                </base-input>
                                
                                <div class="btn-wrapper">
                                    <base-button tag="a"
                                                 href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html"
                                                 class="mb-3 mb-sm-0"
                                                 type="info"
                                                 icon="fa fa-search">
                                        查询
                                    </base-button>
                                    <!-- <base-button tag="a"
                                                 href="https://www.creative-tim.com/product/argon-design-system"
                                                 class="mb-3 mb-sm-0"
                                                 type="white"
                                                 icon="ni ni-cloud-download-95">
                                        Download HTML
                                    </base-button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="images container-fluid mt--200">
                  <a href="" v-for="(img, index) in imageArr" :key="index">
                    <img :src="img.url" alt="" class="image-result">
                  </a>
                  
                </div>
                <Gallery :images="testArr"></Gallery> -->
                <!-- <span class="image-container">
                  <div class="img-wrapper" v-for="(item, index) in imageArr" :key="index">
                    <img class="img" :src="item.url" />
                    <div class="info">
                      <span class="size">helloworld</span>
                    </div>
                  </div>
                </span> -->
                <div class="container-fluid">
                  <div class="img-wrapper mt--200">
                    <a v-for="(img, index) in imageArr" :key="index" @click="checkImage(img.id)">
                      <img :src="img.url" alt="" class="image-result">
                    </a>
                  </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <modal :show.sync="imageDetail"
              gradient="default"
              modal-classes="">
        <h6 slot="header" class="modal-title text-white" id="modal-title-notification">图片详情</h6>

        <div class="py-3">
          <p class="text-white">图片拥有着：{{ ownerNickname }}</p>
          <p class="text-white">联系方式：{{ ownerMail }}</p>
          <p class="text-white">作者公钥：{{ ownerPublicKey }}</p>
        </div>

        <template slot="footer">
            <base-button type="white" @click="imageDetail=false">确认</base-button>
            <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="imageDetail=false">
                取消
            </base-button>
        </template>
      </modal>
    </div>
</template>

<script>
import { getAllImages, requestWithName } from '../api/user'
import Gallery from 'vue-cover-gallery'
import Modal from '../components/Modal'
export default {
  name: "home",
  components: {
    Gallery,
    Modal
  },
  data() {
    return {
      imageArr: [],
      showImgUrl: '',
      ownerNickname: '',
      ownerMail: '',
      ownerPublicKey: '',
      imageDetail: false
    }
  },
  created: function() {
    getAllImages()
    .then(res => {
      const data = res.data
      if(data.whetherGet) {
        this.imageArr = data.images
      } else {
        this.$message.error('获取图片数据库发生错误！')
      }
    })
  },
  methods: {
    checkImage(id) {
      const data = {
        imageID: id
      }
      requestWithName('/users/checkImage', 'post', data)
      .then(res => {
        const data = res.data
        if(data.user) {
          this.ownerNickname = data.nickname
          this.ownerMail = data.username
          this.ownerPublicKey = data.publicKey
          this.imageDetail = true
        } else {
          this.$message.error(data.message)
        }
      })
    }
  }
};
</script>
<style lang="scss">
// .image-cotainer {
//   display: flex; // 这里用到flex布局
//   flex-wrap: wrap; // flex中换行的属性
//   padding: 15px 5px;
//   &::after{ // 用于最后一行最后的位置显示空白
//     content: '';
//     flex-grow: 99999;// 放到最大
//   }
//   .img-wrapper {
//     flex-grow: 1; // 根据比例计算每个图片多长等分剩余空间（好难解释，下面用图解释）
//     margin: 5px;
//     position: relative;
//     overflow: hidden; // 把多余的部分隐藏
//     .img {
//       height: 170px;
//       min-width: 100%; // 要让左右的图片横向是充满他父级标签的宽度
//       object-fit: cover; // 让图片不要压缩
//     }
//     .info{ // 选中时底部提示框
//         position: absolute; 
//         bottom: 4px;
//         color: #ffffff;
//         left: 0;
//         right: 0;
//         background-color: rgba(0,0,0,.3);
//         line-height: 44px;
//         height: 0px;
        
//     }&:hover .info{ // 选中时底部弹出提示框动画
//         height: 44px;
//         transition: all 0.5s;
//     }
//   }
// }
// .img {
//   height: 300px;
//   width: auto;
// }
.image-wrapper{            
  display: flex;/*显示模式设置为弹性盒子*/
  flex-wrap: wrap;/*进行强制换行*/
}        
.image-wrapper:after{            
  /*对最后一个伪元素进行最大限度伸缩*/            
  content: ' ';            
  flex-grow: 999999999999999999999999999999999999;        
}        
.image-result {             
  height: 250px;/*高度*/            
  width: auto;            
  margin: 2px;            
  flex-grow: 1;/*进行按比例伸缩*/            
  object-fit: cover;/*进行裁切，并且图片按比例缩放*/        
}
</style>