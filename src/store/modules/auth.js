import Api from '@/api/api'
import { baseURL, apiVersion } from '../../api/api.config'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    access_token: null,
    refresh_token: null,
    expires: null,
    timer: null,
    code: null,
    last_activity: null,
    username: null
  },
  getters: {
    isLogged (state) {
      return Boolean(state.access_token && state.refresh_token && state.expires)
    }
  },
  mutations: {
    saveState (state) {
      localStorage.setItem('streamusUserTokens', JSON.stringify({
        accessToken: state.access_token,
        refreshToken: state.refresh_token,
        expires: state.expires,
        code: state.code,
        lastActivity: state.last_activity,
        username: state.username
      }))
    },
    setTokens (state, { accessToken, refreshToken, expires }) {
      state.access_token = accessToken
      state.refresh_token = refreshToken
      state.expires = expires
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    setCode (state, code) {
      state.code = code
    },
    setActivity (state, lastActivity) {
      state.last_activity = lastActivity
    },
    setUsername (state, username) {
      state.username = username
    }
  },
  actions: {
    async onAuth ({ commit }, { code, name }) {
      try {
        const result = await Api.post(`${apiVersion}/user/auth`, {
          data: {
            code,
            name
          }
        })

        if (result.success) {
          const {
            result: {
              accessToken = null,
              refreshToken = null,
              expires = null,
              lastActivity = null,
              username = null
            }
          } = result
          commit('setCode', code)
          commit('setActivity', lastActivity)
          commit('setTokens', { accessToken, refreshToken, expires })
          commit('setUsername', username)
          commit('saveState')

          return {
            success: result.success
          }
        } else {
          return {
            success: result.success,
            message: result.error
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async checkTokens ({ commit, state }) {
      const expire = state.expire
      const now = new Date().getTime()

      if (expire - now < 0) {
        const tokens = await Api.post(`${baseURL}/v2/user/auth/refresh-token`, {
          data: {
            refreshToken: state.refresh_token
          }
        })
          .then(res => res.data)
          .catch(error => {
            commit('setTokens', {
              accessToken: null,
              refreshToken: null,
              expires: null
            })
            router.push('/auth')
            throw Error(error)
          })

        commit('auth/setTokens', tokens)
      }
    },
    async updateActivity ({ state, commit }) {
      const { lastActivity } = await Api.put(`${apiVersion}/user/auth/last_activity`, {
        data: {
          code: state.code
        }
      })

      commit('setActivity', lastActivity)
      commit('saveState')
    },
    async logout ({ state, commit }) {
      await Api.get(`${apiVersion}/user/auth/logout`, { code: state.code })
      commit('setTokens', { accessToken: null, refreshToken: null, expires: null })
      commit('setCode', null)
      commit('setActivity', null)
      commit('saveState')
    }
  }
}
