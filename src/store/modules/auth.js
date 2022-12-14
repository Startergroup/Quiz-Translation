import Api from '@/api/api'
import { baseURL, apiVersion } from '../../api/api.config'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    timer: null,
    user: {}
  },
  getters: {
    isLogged (state) {
      const {
        user: {
          token: {
            accessToken = null,
            refreshToken = null,
            expires = null
          }
        }
      } = state

      return Boolean(accessToken && refreshToken && expires)
    }
  },
  mutations: {
    setActivity (state, lastActivity) {
      state.user.lastActivity = lastActivity
    },
    setCode (state, code) {
      state.user.code = code
    },
    saveState (state) {
      localStorage.setItem('streamusUserData', JSON.stringify(state.user))
    },
    setTimer (state, timer) {
      state.timer = timer
    },
    setTokens (state, tokens) {
      state.user.token = tokens
    },
    setUser (state, user) {
      state.user = user
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
          const { user } = result

          commit('setUser', user)
          commit('saveState')

          return {
            success: true
          }
        } else {
          return {
            success: false,
            message: result.error
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async checkTokens ({ commit, state }) {
      if (!Object.keys(state.user).length) {
        commit('setTokens', {
          accessToken: null,
          refreshToken: null,
          expires: null
        })
        await router.push('/auth')
      }

      console.log(1)

      const { token: { expire, refresh_token: refresh = null } } = state.user
      const now = new Date().getTime()

      if (expire - now < 0) {
        const tokens = await Api.post(`${baseURL}/v2/user/auth/refresh-token`, {
          data: {
            code: state.user.code,
            refreshToken: refresh
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
          code: state.user.code
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
