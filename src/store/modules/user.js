import { login, getInfo, refreshToken } from '@/api/login/login'
import {
  getToken,
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
  getRefreshToken,
  setComcode,
  getComcode,
  setUserName
} from '@/utils/auth'

const mutationsType = {
  setToken: 'setToken',
  setName: 'setName',
  setRole: 'setRole',
  setMenus: 'setMenus',
  setRefreshToken: 'setRefreshToken',
  setComcode: 'setComcode',
  setInfoTimes: 'setInfoTimes'
}

const user = {
  state: {
    token: getToken(),
    refreshToken: getRefreshToken(),
    name: '',
    role: '',
    menus: [],
    comcode: getComcode(), // 管理机构
    infoTimes: 0 // info请求次数，限制在5次以内
  },

  mutations: {
    [mutationsType.setToken]: (state, token) => {
      state.token = token
    },
    [mutationsType.setRefreshToken]: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    [mutationsType.setName]: (state, name) => {
      state.name = name
    },
    [mutationsType.setRole]: (state, role) => {
      state.role = role
    },
    [mutationsType.setMenus]: (state, menus) => {
      state.menus = menus
    },
    [mutationsType.setComcode]: (state, comcode) => {
      state.comcode = comcode
    },
    [mutationsType.setInfoTimes]: (state, infoTimes) => {
      state.infoTimes = infoTimes
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const comcode = userInfo.comcode
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, comcode)
          .then(response => {
            const data = response.data
            setUserName(username)
            setToken(data.access_token)
            setRefreshToken(data.refresh_token)
            setComcode(comcode)
            commit(mutationsType.setToken, data.access_token)
            commit(mutationsType.setRefreshToken, data.refresh_token)
            commit(mutationsType.setComcode, comcode)
            // console.log('login', comcode)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 刷新token
    GetRefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refreshToken)
          .then(response => {
            const data = response.data
            setToken(data.access_token)
            setRefreshToken(data.refresh_token)
            setComcode(data.comcode)
            commit(mutationsType.setToken, data.access_token)
            commit(mutationsType.setRefreshToken, data.refresh_token)
            commit(mutationsType.setComcode, data.comcode)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            const menus = [] // note: menus must be a array! such as: ['editor','develop']
            const infoTimes = state.infoTimes + 1
            commit(mutationsType.setInfoTimes, infoTimes)
            if (data.code === 0 && data.body.length > 0) {
              for (let i = 0; i < data.body.length; i++) {
                if (data.body[i]) {
                  menus.push(data.body[i])
                }
              }
              commit(mutationsType.setMenus, menus)
            } else {
              console.log('getInfo:menus must be a non-null array !')
              // reject('getInfo:menus must be a non-null array !') // 暂时注释掉
            }
            // commit(mutationsType.setName, data.name) // 目前估计不会有name属性
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise(resolve => {
        commit(mutationsType.setToken, '')
        commit(mutationsType.setRole, '')
        commit(mutationsType.setComcode, '')
        commit(mutationsType.setMenus, [])
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit(mutationsType.setToken, '')
        commit(mutationsType.setComcode, '')
        commit(mutationsType.setComcode, '')
        removeToken()
        removeRefreshToken()
        resolve()
      })
    }
  }
}

export default user
