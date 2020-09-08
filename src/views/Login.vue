<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
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
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83"
                                            ref="username"
                                            v-model="loginForm.username"
                                            name="username">
                                </base-input>
                                <p class="mailHint" v-if="mailHint">{{ hint }}</p>
                                <base-input alternative
                                            type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            :key="passwordType"
                                            v-model="loginForm.password"
                                            @keyup.enter.native="handleLogin">
                                </base-input>
                                <base-input alternative
                                            type="text"
                                            placeholder="验证码"
                                            addon-left-icon="ni ni-notification-70"
                                            v-model="loginForm.verification">
                                
                                </base-input>
                                <p class="mailHint" v-if="verificationHint">{{veriHint}}</p>
                                <base-identify 
                                    @click.native="newCode()"
                                    :identifyCode="identifyCode"></base-identify>
                                <base-checkbox>
                                    记住这台电脑
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click.native.prevent="handleLogin">登录</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>忘记密码？</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light" @click="createAccount()">
                                <small>创建新的账户</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <modal :show.sync="canRegister"
                   gradient="danger"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">警告</h6>

            <div class="py-3 text-center">
                <i class="ni ni-bell-55 ni-3x"></i>
                <h4 class="heading mt-4">请您注意</h4>
                <p>{{ message }}</p>
            </div>

            <template slot="footer">
                <base-button type="white" @click="canRegister=false">好的知道了</base-button>
                <base-button type="link"
                                text-color="white"
                                class="ml-auto"
                                @click="canRegister=false">
                    关闭
                </base-button>
            </template>
        </modal>
    </section>
</template>
<script>
import BaseIdentify from '../components/BaseIdentify'
import Modal from '../components/Modal'
export default {
    components: {
        BaseIdentify,
        Modal
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的用户名！'))
            } else {
                callback()
            }
            }
            const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能少于6个字符！'))
            } else {
                callback()
            }
        }
        return {
            code: this.refreshCode(4),
            loginForm: {
                username: '',
                password: '',
                verification: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            redirect: undefined,
            otherQuery: {},
            canRegister: false,
            usedName: false,
            mailHint: false,
            hint: '请您输入正确的邮箱格式！',
            verificationHint: false,
            veriHint: '请您输入正确的验证码！',
            message: '请您正确填写表格'
        }
    },
    watch: {
        loginForm: {
            handler(newValue, oldValue) {
                this.message = '请您正确填写表格'
                const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                reg.test(newValue.username)? this.mailHint = false: this.mailHint = true
                newValue.verification === this.code? this.verificationHint = false: this.verificationHint = true
            },
            deep: true
        }
    },
    computed: {
        identifyCode: {
            get: function() {
                return this.code
            },
            set: function() {
                this.code = this.refreshCode()
            }
            
        }
    },
    methods: {
        checkCapslock({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                this.capsTooltip = true
                } else {
                this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        handleLogin() {
            for(let item in this.loginForm) {
                if(this.loginForm[item] === '') {
                    this.canRegister = true
                }
            }
            if(this.canRegister === false && this.mailHint === false && this.verificationHint === false) {
                this.$store.dispatch('user/login', this.loginForm)
                .then((data) => {
                    if(data.login) {
                        
                        this.$router.push({ path:'/', query: this.otherQuery })
                        return this.$store.dispatch('user/getInfo')
                    } else {
                        this.message = '您输入的用户名或者密码不正确，登录失败'
                        this.canRegister = true
                        return new Promise((resolve, reject) => {reject('user log in failed')})
                    }
                })
                .then(info => {
                    
                })
                .catch((err) => {
                    console.log(err)
                    console.log('login failed')
                    this.loading = false
                })
            }
            
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        },
        createAccount() {
            this.$router.push({path: '/register'})
        },
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
    }
};
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
