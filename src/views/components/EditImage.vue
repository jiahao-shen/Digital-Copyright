<template>
  <div class="container mt--300">
    <card>
      <template v-slot:header>
        <div class="text-center">
          <h3>编辑图片</h3>
        </div>
        </template>
      <div class="container">
        <div class="row justify-content-center">
          <img :src="url" alt="" class="image">
        </div>
        <div class="row justify-content-center info">
          <image-detail v-for="(info,index) in imageInfo" :key="index" :tableData="info"></image-detail>
        </div>

        <div class="row justify-content-center transfer">
          <div class="col-lg-5">
            
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <div class="text-center">
          <base-button type="primary" @click="canTransfer=true">转让</base-button>
          <base-button type="secondary" @click="register">登记</base-button>
          <base-button type="default" @click="monit">{{monitMessage}}</base-button>
          <base-button type="info" @click="goback">返回</base-button>
        </div>
      </template>
    </card>

    <modal :show.sync="canTransfer"
            gradient="default"
            modal-classes="modal-danger modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification">请确认版权转让</h6>

      <div class="py-3 text-center">
          <!-- <i class="ni ni-bell-55 ni-3x"></i>
          <h4 class="heading mt-4">请您注意</h4>
          <p>这什么玩意儿</p> -->
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <template>
              <form
                role="form"
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                >
                <base-input alternative
                            class="mb-3"
                            placeholder="请输入您的公钥"
                            addon-left-icon="ni ni-lock-circle-open"
                            ref="publicKey"
                            v-model="loginForm.publicKey"
                            name="publicKey">
                </base-input>
                <p class="mailHint" v-if="mailHint">请输入正确的公钥</p>
                <base-input alternative
                            type="password"
                            placeholder="请输入您的私钥"
                            ref="privateKey"
                            name="privateKey"
                            addon-left-icon="ni ni-lock-circle-open"
                            :key="passwordType"
                            v-model="loginForm.privateKey"
                            @keyup.enter.native="handleLogin">
                </base-input>
                <p class="mailHint" v-if="privateKeyHint">请输入正确的私钥</p>
                <base-input alternative
                            type="password"
                            placeholder="请再次输入您的私钥"
                            addon-left-icon="ni ni-lock-circle-open"
                            ref="privateKeyReenter"
                            name="privateKeyReenter"
                            v-model="loginForm.passwordReenter"
                            @keyup.enter.native="handleLogin">
                </base-input>
                <p class="mailHint" v-if="repeatKeyHint">请保证两次输入的私钥相同！</p>
                <base-input alternative
                            type="text"
                            placeholder="请输入对方公钥地址"
                            addon-left-icon="ni ni-notification-70"
                            v-model="loginForm.target">
                
                </base-input>
                <p class="mailHint" v-if="targetAddressHint">请输入正确的公钥地址！</p>
                <base-input alternative
                            type="text"
                            placeholder="验证码"
                            addon-left-icon="ni ni-notification-70"
                            v-model="loginForm.verification">
                
                </base-input>
                <p class="mailHint" v-if="verificationHint">请输入正确的验证码！</p>
                <base-identify 
                    @click.native="newCode()"
                    :identifyCode="identifyCode"></base-identify>
              </form>
            </template>
          </card>
      </div>

      <template slot="footer">
          <base-button type="white" @click="transfer">确认转账</base-button>
          <base-button type="link"
                          text-color="white"
                          class="ml-auto"
                          @click="canTransfer = false">
              关闭
          </base-button>
      </template>
    </modal>

    <modal :show.sync="whetherMonit"
            gradient="danger"
            modal-classes="modal-danger modal-dialog-centered">
      <h6 slot="header" class="modal-title" id="modal-title-notification">主动监测</h6>

      <div class="py-3 text-center">
          <i class="ni ni-bell-55 ni-3x"></i>
          <h4 class="heading mt-4">警告</h4>
          <p>{{ monitHint }}</p>
      </div>

      <template slot="footer">
          <base-button type="white" @click="activeMonit">确认</base-button>
          <base-button type="link"
                        text-color="white"
                        class="ml-auto"
                        @click="whetherMonit=false">
              取消
          </base-button>
      </template>
    </modal>
  </div>
  
</template>
<script>
import BaseIdentify from '../../components/BaseIdentify'
import Card from '../../components/Card'
import { getImage, transferImage, monitImage, calcelMonit, transferAsset } from '../../api/user'
import ImageDetail from '../components/imageDetail'
import Modal from '../../components/Modal'

export default {
  components: {
    Card,
    ImageDetail,
    BaseIdentify,
    Modal
  },
  methods: {
    newCode() {
        this.code = this.refreshCode(4)
    },
    refreshCode(length) {
      let randomNum = 0
      while(randomNum < Math.pow(10, length - 1)) {
          randomNum = Math.floor(Math.random() * Math.pow(10, length))
      }
      return randomNum.toString()
    },
    validatePublic: function(rule, value, callback) {
      if(!value) {
        return callback(new Error('输入信息不能为空！'))
      }
    },
    validatePrivate: function(rule, value, callback) {
      if(!value) {
        this.$message.error('输入信息不能为空')
      }
    },
    transfer() {
      if(!this.mailHint && !this.veriHint && !this.privateKeyHint && !this.repeatKeyHint && !this.targetAddressHint && !this.verificationHint) {
        const reqData = {
          publicKey: this.loginForm.publicKey,
          privateKey: this.loginForm.privateKey,
          transferTo: this.loginForm.target,
          imageID: this.id
        }
        transferAsset(reqData)
        .then(res => {
          const data = res.data
          if(data.transfer) {
            this.$message({
              type: 'success',
              message: '成功将作品转让'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {
              
            })
            .catch(err => {
              this.$message.error('不能成功获取用户信息' + err)
            }) 
            this.canTransfer = true
          } else {
            this.$message.error('转让失败，请检查是否填错公私钥地址')
          }
        })
        
      } else {
        this.$message.error('请完善表格！')
      }
    },
    goback() {
      this.$router.go(-1)
    },
    confirmTransfer() {
      if(!this.mailHint && !this.veriHint && !this.privateKeyHint && !this.repeatKeyHint && !this.targetAddressHint && !this.verificationHint) {
        
      } else {
        this.$message.error('请完善表格！')
      }
    },
    register() {
      
    },
    monit() {
      this.whetherMonit = true
    },
    activeMonit() {
      const info = JSON.parse(localStorage.getItem('user-info'))
      const token = this.$store.getters.token
      const mail = info.mail
      const reqData = {
        mail: mail,
        token: token,
        imageID: this.id
      }
      if(!this.whetherMonitered) {
        monitImage(reqData)
        .then(res => {
          if(res.data.update) {
            this.whetherMonit = false
            this.whetherMonitered = true
            this.whetherMonitered? this.monitMessage = '取消监测' : this.monitMessage = '监测'
            this.whetherMonitered? this.monitHint = '您确定要取消监测吗？您的作品被侵权后将不会被主动提醒。' :this.monitHint = '您确认要加入主动监测吗？主动监测将会在全网搜索，如果有侵犯您隐私的图片将进行实时通知。'
            this.$message({
              type: 'success',
              message: '成功监控文件！'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {
              
            })
            .catch(err => {
              this.$message.error('不能成功获取用户信息' + err)
            }) 
          } else {
            this.$message.error('监控文件失败')
          }
        })
        
      } else {
        calcelMonit(reqData)
        .then(res => {
          const data = res.data
          if(data.cancel) {
            this.whetherMonitered = false
            this.whetherMonitered? this.monitMessage = '取消监测' : this.monitMessage = '监测'
            this.whetherMonitered? this.monitHint = '您确定要取消监测吗？您的作品被侵权后将不会被主动提醒。' :this.monitHint = '您确认要加入主动监测吗？主动监测将会在全网搜索，如果有侵犯您隐私的图片将进行实时通知。'
            this.$message({
              type: 'success',
              message: '成功取消主动监测'
            })
            this.$store.dispatch('user/getInfo')
            .then(res => {
              
            })
            .catch(err => {
              this.$message.error('不能成功获取用户信息' + err)
            }) 
          } else {
            this.$message.error('取消主动监测失败')
          }
        })
      }
      this.whetherMonit = false
    }
  },
  data() {
    return {
      url: '',
      imageInfo: [],
      loginForm: {
        publicKey: '',
        privateKey: '',
        verification: '',
        passwordReenter: '',
        target: ''
      },
      code: this.refreshCode(4),
      loginRules: {
        publicKey: [{ required: true, trigger: 'blur', validator: this.validatePublic }],
        privateKey: [{ required: true, trigger: 'blur', validator: this.validatePrivate }],
        privateKeyReenter: [{ required: true, trigger: 'blur', validator: this.validatePrivate }]
      },
      mailHint: true,
      hint: '',
      verificationHint: false,
      veriHint: '',
      passwordType: 'password',
      privateKeyHint: false,
      repeatKeyHint: false,
      targetAddressHint: false,
      imageObj: Object,
      canTransfer: false,
      whetherMonit: false,
      id: '',
      monitMessage: '监测',
      whetherMonitered: false,
      monitHint: ''
    }
  },
  computed: {
    identifyCode: {
      get: function() {
        return this.code
      },
      set: function() {
        this.code = this.refreshCode(4)
      }
    }
  },
  watch: {
    loginForm: {
      deep: true,
      handler(newValue, oldValue) {
        if(newValue.publicKey.length != 44) {
          this.mailHint = true
        } else {
          this.mailHint = false
        }
        if(newValue.privateKey.length != 44) {
          this.privateKeyHint = true
        } else {
          this.privateKeyHint = false
        }
        if(newValue.target.length != 44) {
          this.targetAddressHint = true
        } else {
          this.targetAddressHint = false
        }
        if(newValue.passwordReenter !== newValue.privateKey) {
          this.repeatKeyHint = true
        } else {
          this.repeatKeyHint = false
        }
        if(newValue.verification !== this.code) {
          this.verificationHint = true
        } else {
          this.verificationHint = false
        }
      }
    }
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    const token = this.$store.getters.token
    this.id = this.$route.params.id
    const mail = info.mail
    const reqData = {
      token: token,
      mail: mail,
      id: this.id
    }
    getImage(reqData).then(res => {
      if(!res.data.whetherImage) {
        this.$message.error(res.data.message)
      } else {
        const image = res.data.imageObj
        this.imageObj = res.data.imageObj
        this.url = image.url
        this.whetherMonitered = image.whetherMonitor
        this.whetherMonitered? this.monitMessage = '取消监测' : this.monitMessage = '监测'
        this.whetherMonitered? this.monitHint = '您确定要取消监测吗？您的作品被侵权后将不会被主动提醒。' :this.monitHint = '您确认要加入主动监测吗？主动监测将会在全网搜索，如果有侵犯您隐私的图片将进行实时通知。'
        this.imageInfo.push([
          {
            name: '图像ID',
            value: image.otherInfo.id
          },{
            name: '图像名称',
            value: image.title
          }, {
            name: 'ipfs哈希值',
            value: image.ipfs_hash
          }, {
            name: '拥有者',
            value: image.owner
          }, {
            name: '区块链Transaction ID',
            value: image.otherInfo.id
          }, {
            name: '交易类型',
            value: image.otherInfo.operation
          }
        ])
      }
    })
  }
}
</script>
<style scoped>
.image {
  width: 90%;
}
.info {
  margin-top: 5vh;
  width: 90%;
  margin-left: 5%;
}
.usedName {
    font-size: 0.5em;
    margin: 0 auto;
    color: #f5365c;
}
.mailHint {
    font-size: 0.8em;
    margin: 0 auto;
    color: #f5365c;
}
.transfer {
  margin-top: 5vh;
}
</style>