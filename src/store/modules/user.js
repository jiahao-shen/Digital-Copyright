import { login, logout, getInfo, register, whetherRegister, setInformation } from '../../api/user'
import { getToken, setToken, removeToken, setInfo, getInfoLocal, setInfoLocal, removeInfoLocal } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  // name: '',
  // avatar: '',
  // introduction: '',
  // images: [],
  // workCount: 0,
  // registerCount: 0,
  // monitorCount: 0,
  // age: 0,
  // residence: '',
  // jobTitle: '',
  // workplace: '',
  // notification: 0
  info: getInfoLocal()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    // state.images = info.images
    // state.workCount = info.workCount
    // state.registerCount = info.registerCount
    // state.monitorCount = info.monitorCount
    // state.age = info.age
    // state.residence = info.residence
    // state.jobTitle = info.jobTitle
    // state.workplace = info.workplace
    // state.notification = info.notification
    state.info = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if(data.token) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(data)
        } else {
          resolve(data)
        } 
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        } else {
          const { nickname, avatar, self_introduction  } = data
          // commit('SET_ROLES', roles)
          commit('SET_NAME', nickname)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', self_introduction)
          commit('SET_INFO', data)
          setInfoLocal(data)
          // commit('SET_INTRODUCTION', introduction)
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeInfoLocal()
        // resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // register user
  register({ commit }, userInfo) {
    const { username, password, mail } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, mail: mail }).then(response => {
        const { data } = response
        console.log(data)
        if(data.token) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(data)
        } else {
          reject()
        } 
      }).catch(error => {
        reject(error)
      })
    })
  }, 

  // judge whether an email is used
  whetherRegister({commit}, email) {
    return new Promise((resolve, reject) => {
      const input = { 'email' : email}
      whetherRegister(input).then(response => {
        const { data } = response
        resolve(data.exist)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // set information in edit profile page
  setInformation({commit}, data) {
    return new Promise((resolve, reject) => {
      setInformation(data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
