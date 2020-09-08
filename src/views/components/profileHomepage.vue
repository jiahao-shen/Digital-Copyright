<template>
  <section class="section section-skew">
      <div class="container">
          <card shadow class="card-profile mt--300" no-body>
              <div class="px-4">
                  <div class="row justify-content-center">
                      <div class="col-lg-3 order-lg-2">
                          <div class="card-profile-image">
                              <a @click="editProfile()">
                                  <img v-bind:v-lazy="avatar" class="rounded-circle" v-bind:src="avatar">
                              </a>
                          </div>
                      </div>
                      <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                          <div class="card-profile-actions py-4 mt-lg-0">
                              <base-button type="info" size="sm" class="mr-4" @click="toMessages()"><i class="ni ni-chat-round" ></i> 消息通知 <badge type="default">{{ notification }}</badge></base-button>
                              <base-button type="default" size="sm" class="float-right" @click="editProfile()"><i class="ni ni-settings"></i>个人设置 <badge type="white">1</badge></base-button>
                          </div>
                      </div>
                      <div class="col-lg-4 order-lg-1">
                          <div class="card-profile-stats d-flex justify-content-center">
                              <div>
                                  <span class="heading">{{ workCount }}</span>
                                  <span class="description">作品数量</span>
                              </div>
                              <div>
                                  <span class="heading">{{ registerCount }}</span>
                                  <span class="description">已登记作品数量</span>
                              </div>
                              <div>
                                  <span class="heading">{{ monitorCount }}</span>
                                  <span class="description">正在监测作品</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="text-center mt-5">
                    <base-button type="warning" @click="uploadWork" class="upload-button"><i class="ni ni-cloud-upload-96"></i>上传作品</base-button>
                    <h3>{{ name }}
                        <span class="font-weight-light">, {{ age }} 岁</span>
                    </h3>
                    <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{ residence }}</div>
                    <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{ jobTitle }}</div>
                    <!-- <div><i class="ni education_hat mr-2"></i>{{ workplace }}</div> -->
                  </div>
                  <div class="mt-5 py-5 border-top text-center">
                      <div class="row justify-content-center">
                          <div class="col-lg-9">
                              <p>{{ self_introduction }}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </card>
          <div class="text-center mt-10 justify-content-center">
            <tabs>
              <tab-pane title="作品集">
                <transition name="fade">
                  <div class="row">
                    <card shadow class="collections col-6" v-for="(img,index) in pages" v-bind:key="index">
                      <template v-slot:header>
                        {{img.title}}
                      </template>
                      <div >
                        <img v-bind:src="img.url" alt="index" class="collection-image">
                      </div>
                      <template v-slot:footer>
                        <div class="row justify-content-center">
                          <base-button type="success" @click="checkImage(img._id)">查看</base-button>
                          <base-button type="primary" @click="editImage(img._id)">编辑</base-button>
                        </div>
                      </template>
                    </card>
                    
                  </div>
                </transition>
                <base-pagination class="pagination-nav"
                  :perPage="perPage"
                  :total="images.length"
                  :align="'center'"
                  :value="currentPage"
                  @input="changePage"
                  :key="1"
                  >
                </base-pagination>
              </tab-pane>
              <tab-pane title="登记作品">
                
                <div class="row">
                  <card shadow class="collections col-6" v-for="(img,index) in pages2" v-bind:key="index">
                    <template v-slot:header>
                      {{img.title}}
                    </template>
                    <div >
                      <img v-bind:src="img.url" alt="index" class="collection-image">
                    </div>
                    <template v-slot:footer>
                      <div class="row justify-content-center">
                        <base-button type="success" @click="checkImage(img._id)">查看</base-button>
                        <base-button type="primary" @click="editImage(img._id)">编辑</base-button>
                      </div>
                    </template>
                  </card>
                </div>
                <base-pagination class="pagination-nav"
                  :perPage="perPage"
                  :total="registerimages.length"
                  :align="'center'"
                  :value="currentPage2"
                  @input="changePage2"
                  :key="2"
                  >
                </base-pagination>
              </tab-pane>
              <tab-pane title="监测作品">
                  <div class="row">
                    <card shadow class="collections col-6" v-for="(img,index) in pages3" v-bind:key="index">
                      <template v-slot:header>
                        {{img.title}}
                      </template>
                      <div >
                        <img v-bind:src="img.url" alt="index" class="collection-image">
                      </div>
                      <template v-slot:footer>
                        <div class="row justify-content-center">
                          <base-button type="success" @click="checkImage(img._id)">查看</base-button>
                          <base-button type="primary" @click="editImage(img._id)">编辑</base-button>
                        </div>
                      </template>
                    </card>
                  </div>
                  <base-pagination class="pagination-nav"
                    :perPage="perPage"
                    :total="monitorimages.length"
                    :align="'center'"
                    :value="currentPage3"
                    @input="changePage3"
                    :key="3"
                    >
                  </base-pagination>
              </tab-pane>

            </tabs>
            
          </div>
      </div>
      <el-dialog
        title="查看图片"
        :visible.sync="dialogVisible"
        width="70%"
        >
        <span><img :src="imageUrl" alt="" class="box-image"></span>
        <span slot="footer" class="dialog-footer">
          <base-button type="secondary" @click="dialogVisible = false">取 消</base-button>
          <base-button type="primary" @click="dialogVisible = false">确 定</base-button>
        </span>
      </el-dialog>
      <!-- <modal 
        :show.sync="dialogVisible"
        
        modal-classes="modal-dialog-centered check-image">
          <h6 slot="header" class="modal-title" id="modal-title-default">查看图片</h6>

          <span><img :src="imageUrl" alt="" class="box-image"></span>

          <template slot="footer">
            <base-button type="secondary" @click="dialogVisible = false">取 消</base-button>
            <base-button type="primary" @click="dialogVisible = false">确 定</base-button>
          </template>
      </modal> !-->
  </section>
</template>
<script>
import Tabs from '../../components/Tabs/Tabs'
import TabPane from '../../components/Tabs/TabPane'
import { FadeTransition } from "vue2-transitions";
import { BasePagination } from '../../components/BasePagination';
import Card from '../../components/Card'
import tinyMice from '../components/tinymise'
import { getImage } from '../../api/user'
import Modal from '../../components/Modal'
export default {
  components: {
    Tabs,
    TabPane,
    FadeTransition,
    Card,
    tinyMice,
    Modal
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.workCount = info.workCount
    this.notification = info.notification
    this.registerCount = info.registerCount
    this.monitorCount = info.monitorCount
    this.name = info.nickname
    this.age = info.age
    this.residence = info.residence
    this.jobTitle = info.jobTitle
    this.workplace = info.workplace
    this.self_introduction = info.self_introduction
    this.avatar = info.avatar
    this.images = info.allimages
    this.monitorimages = info.monitorimages
    this.registerimages = info.registerimages
    this.right = this.images.length > this.perPage? this.perPage: this.images.length;
    this.right2 = this.registerimages.length > this.perPage? this.perPage: this.registerimages.length;
    this.right3 = this.monitorimages.length > this.perPage? this.perPage: this.monitorimages.length;
  },

  data() {
    return {
      workCount: 10,
      registerCount: 5, 
      monitorCount: 8,
      name: '小明',
      age: 27, 
      residence: '北京',
      jobTitle: '自由摄影师',
      workplace: 'Hypercool视觉研究院',
      self_introduction: '大家好，我是一名自由摄影师小明，很高兴能认识大家，希望大家能够喜欢我的作品',
      avatar: 'img/theme/team-4-800x800.jpg',
      images: [
          'img/theme/team-1-800x800.jpg',
          'img/theme/team-2-800x800.jpg',
          'img/theme/team-3-800x800.jpg',
          'img/theme/team-4-800x800.jpg',
          'img/theme/img-1-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
          'img/theme/team-1-800x800.jpg',
          'img/theme/team-2-800x800.jpg',
          'img/theme/team-3-800x800.jpg',
          'img/theme/team-4-800x800.jpg',
          'img/theme/img-1-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
          'img/theme/img-2-1200x1000.jpg',
      ],
      notification: 4,
      perPage: 4,
      left: 0,
      left2: 0,
      left3: 0,
      right: 0,
      right2: 0,
      right3: 0,
      currentPage: 1,
      monitorimages: [],
      registerimages: [],
      currentPage2: 1,
      currentPage3: 1,
      dialogVisible: false,
      imageUrl: ''
    }
  },
  methods: {
    editProfile: function() {
      this.$router.push({path: '/profile/editprofile'})
    },
    toMessages: function() {
      this.$router.push({path: '/profile/messages'})
    },
    changePage: function(value) {
      this.left = (value - 1) * this.perPage;
      this.right = value * this.perPage > this.images.length? this.images.length : value * this.perPage;
      this.currentPage = value
      // this.pages = this.images.slice(left, right)
    },
    changePage2: function(value) {
      this.left2 = (value - 1) * this.perPage;
      this.right2 = value * this.perPage > this.registerimages.length? this.registerimages.length : value * this.perPage;
      this.currentPage2 = value
    },
    changePage3: function(value) {
      this.left3 = (value - 1) * this.perPage;
      this.right3 = value * this.perPage > this.monitorimages.length? this.monitorimages.length : value * this.perPage;
      this.currentPage3 = value
    },
    imageWork: function() {
      const info = JSON.parse(localStorage.getItem('user-info'))
      this.images = info.allimages
    },
    registeredWork: function() {
      console.log('click registerwork')
      const info = JSON.parse(localStorage.getItem('user-info'))
      this.images = info.registerimages
      console.log(this.images)
    },
    monitorWork: function() {
      const info = JSON.parse(localStorage.getItem('user-info'))
      this.images = info.monitorimages
    },
    checkImage: function(id) {
      const info = JSON.parse(localStorage.getItem('user-info'))
      const token = this.$store.getters.token
      const mail = info.mail
      const reqData = {
        token: token,
        mail: mail,
        id: id
      }
      getImage(reqData).then(res => {
        this.imageUrl = res.data.imageObj.url
        this.dialogVisible = true
      })
    },
    editImage: function(id) {
      this.$router.push({path: `/profile/image/${id}`})
    },
    uploadWork: function() {
      this.$router.push({path: '/profile/uploadImage'})
    }
  },
  computed: {
    pages() {
      return this.images.slice(this.left, this.right)
    },
    pages2() {
      // this.right = this.registerimages.length > this.perPage? this.perPage: this.images.length;
      return this.registerimages.slice(this.left2, this.right2)
    },
    pages3() {
      // this.right = this.monitorimages.length > this.perPage? this.perPage: this.images.length;
      return this.monitorimages.slice(this.left3, this.right3)
    }
  },
  watch: {
    pages() {
      return this.images.slice(this.left, this.right)
    }
  }
}
</script>
<style scoped lang="scss">
.collection-image {
    max-width: 100%;
    width: auto;
    margin-top: 2vh;
    max-height: 400px;
}
.pagination-nav {
  margin-top: 5vh;
}
.collections {
  max-width: 45%;
  margin: 2vh auto;
}
.upload-button {
  margin-bottom: 3vh;
}
.box-image {
  width: 100%;
}
.modal-dialog {
  max-width: 70%;
}
</style>
