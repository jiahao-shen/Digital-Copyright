<template>
  <div class="container">
    <card shadow class="card-profile mt--300">
      <template v-slot:header>
        <div class="row justify-content-center">
          <h3>个人信息</h3>
        </div>
      </template>
      <div class="row justify-content-md-center">
        <!-- <div class="col-md-3 text-center">
          <div>用户ID</div>
          <span>账户类型</span>
          <span>昵称</span>
          <span>注册时间</span>
        </div>
        <div class="col-md-5 text-center">
          {{ id }}
        </div> -->
        <div class="col-md-6">
          <b-list-group>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">用户ID</div>
                <div class="col-md-6">{{ info.mail }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">总作品数量</div>
                <div class="col-md-6">{{ info.workCount }}</div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">昵称</div>
                <div class="col-md-6" v-if="!changeName">{{ info.nickname }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.nickname" v-if="changeName" v-model="info.nickname">
                <div class="col-md-3"> <base-button type="primary" @click="changeNickname()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">头像</div>
                <div class="col-md-9">
                  <image-upload></image-upload>
                </div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">年龄</div>
                <div class="col-md-6" v-if="!changeAge">{{ info.age }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.age" v-if="changeAge" v-model="info.age">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserAge()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">居住地</div>
                <div class="col-md-6" v-if="!changeResidence">{{ info.residence }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.residence" v-if="changeResidence" v-model="info.residence">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserResidence()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">职位</div>
                <div class="col-md-6" v-if="!changeJob">{{ info.jobTitle }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.jobTitle" v-if="changeJob" v-model="info.jobTitle">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserJob()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">自我介绍</div>
                <div class="col-md-6" v-if="!changeIntro">{{ info.self_introduction }}</div>
                <input type="text" class="form-control col-md-6" v-bind:placeholder="info.self_introduction" v-if="changeIntro" v-model="info.self_introduction">
                <div class="col-md-3"> <base-button type="primary" @click="changeUserIntro()">更改</base-button></div>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="row">
                <div class="col-md-3">注册时间</div>
                <div class="col-md-6">{{ info.date }}</div>
              </div>
            </b-list-group-item>
             <b-list-group-item>
              <div class="row">
                <div class="col-md-3">公钥</div>
                <div class="col-md-6">{{ info.publicKey }}</div>
              </div>
            </b-list-group-item>
             <b-list-group-item>
              <div class="row">
                <div class="col-md-3">私钥</div>
                <div class="col-md-6">{{ privateKey }}</div>
                <div class="col-md-3"> <base-button type="primary" @click="checkPrivKey()">查看</base-button></div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <template v-slot:footer>
        <div class="row justify-content-center">
           <base-button type="success" @click="save()">保存</base-button>
           <base-button type="primary" @click="goback()">返回</base-button>
        </div>
      </template>
    </card>
    <modal :show.sync="saveStatus">
                <h6 slot="header" class="modal-title" id="modal-title-default">提醒</h6>

                保存成功

                <template slot="footer">
                  <base-button type="primary" @click="goback">确定</base-button>
                  <base-button type="secondary" class="ml-auto" @click="saveStatus=false">关闭</base-button>
                </template>
            </modal>
    <modal :show.sync="saveFailure"
                   gradient="danger"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">警告</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">请您注意</h4>
                <p>保存信息失败</p>
            </div>

            <template slot="footer">
                <base-button type="white" @click="goback">好的知道了</base-button>
                <base-button type="link"
                                text-color="white"
                                class="ml-auto"
                                @click="saveFailure=false">
                    关闭
                </base-button>
            </template>
        </modal>
  </div>
</template>
<script>
import Modal from '../../components/Modal'
import ImageUpload from '@/components/ImageUpload'
export default {
  components: {
    Modal,
    ImageUpload
  },
  data() {
    return {
      info: {
        mail: 'crsong@bupt.edu.cn',
        accountType: '个人账户',
        nickname: 'Hypercool的开发者',
        registerDate: new Date()
      },
      changeName: false,
      changeAge: false,
      changeResidence: false,
      changeJob: false,
      changeIntro: false,
      privateKey: '',
      saveStatus: false,
      saveFailure: false
    }
  },
  created() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.info = info
    this.privateKey = this.info.privateKey
    this.privateKey = this.privateKey.split('')
    this.privateKey = this.privateKey.map((value) => {
      value = '$'
    }).toString()
  },
  methods: {
    changeNickname: function() {
      if(this.changeName === true) {
        
      }
      this.changeName = !this.changeName
    },
    changeUserAge() {
      this.changeAge = !this.changeAge
    },
    changeUserResidence() {
      this.changeResidence = !this.changeResidence
    },
    changeUserJob() {
      this.changeJob = !this.changeJob
    },
    changeUserIntro() {
      this.changeIntro = !this.changeIntro
    },
    checkPrivKey() {
      this.privateKey = this.info.privateKey
    },
    save: function() {
      const data = {
        mail: this.info.mail,
        nickname: this.info.nickname,
        age: this.info.age,
        residence: this.info.residence,
        jobTitle: this.info.jobTitle,
        self_introduction: this.info.self_introduction
      }
      this.$store.dispatch('user/setInformation', data)
      .then(result => {
        if(result.update) {
          this.saveStatus = true
          return this.$store.dispatch('user/getInfo')
        }
      })
      .then(data => {
      })
      .catch(err => {
        this.saveFailure = true
      })
    },
    goback: function() {
      this.$router.go(-1)
    }
  }
}
</script>