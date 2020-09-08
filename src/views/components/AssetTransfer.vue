<template>
  <div class="container mt--400">
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
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
                
                <div class="text-center">
                    <base-button type="primary" class="my-4" @click.native.prevent="handleTransfer">确认</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseIdentify from '../../components/BaseIdentify'
export default {
  components: {
    BaseIdentify
  },
  data() {
    return {
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
      mailHint: false,
      hint: '',
      verificationHint: false,
      veriHint: '',
      passwordType: 'password',
      privateKeyHint: false,
      repeatKeyHint: false,
      targetAddressHint: false,
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
    handleTransfer: function() {
      
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
  }
}
</script>
<style lang="scss">
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
</style>