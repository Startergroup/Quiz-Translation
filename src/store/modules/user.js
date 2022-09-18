import { baseURL, wsBaseURL } from '@/api/api.config'
import Api from '@/api/api'

export default {
  namespaced: true,
  state: {
    quizzes: null,
    attemptCount: 0
  },
  mutations: {
    setQuizzes (state, payload) {
      state.quizzes = payload
    }
  },
  actions: {
    getQuizzes ({ commit, state, dispatch }) {
      const webSocketOpen = (() => {
        return new WebSocket(`${wsBaseURL}/quizlet/get/all`)
      })()
      const webSocketSendData = message => {
        webSocketWaitConnection(function () {
          webSocketOpen.send(message)
        }, 1000)
      }
      const webSocketWaitConnection = (callback, interval) => {
        if (webSocketOpen.readyState === 1) {
          callback()
        } else {
          setTimeout(() => {
            webSocketWaitConnection(callback, interval)
          }, interval)
        }
      }

      webSocketWaitConnection(function () {
        webSocketSendData(state.token)
      }, 1000)

      webSocketOpen.onmessage = event => {
        commit('setQuizzes', JSON.parse(event.data))
      }

      webSocketOpen.onclose = event => {
        console.log('Socket is closed. Reconnect well be in 1 second', event.reason)
        if (state.attemptCount < 5) {
          setTimeout(() => {
            ++state.attemptCount
            dispatch('getQuizzes')
          }, 1000)
        }
      }

      webSocketOpen.onerror = error => {
        console.error('Socket encountered error: ', error, 'Closing socket')
        console.error('Socket encountered error: ', error, 'Reconnect well be in 1 second')
        webSocketOpen.close()
        if (state.attemptCount < 5) {
          setTimeout(() => {
            ++state.attemptCount
            dispatch('getQuizzes')
          }, 1000)
        }
      }
    },
    async getUser ({ commit }, code) {
      return await Api.get(`${baseURL}/user/get`, { code })
    }
  }
}
