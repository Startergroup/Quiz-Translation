import { baseURL, apiVersion } from '@/api/api.config'
import Api from '@/api/api'

export default {
  namespaced: true,
  state: {
    attemptCount: 0,
    isPassed: false,
    quizzes: null,
    selectedQuizId: null
  },
  getters: {
    selectedQuiz (state) {
      if (!state.selectedQuizId) return null
      return state.quizzes.find(item => item.id === state.selectedQuizId)
    }
  },
  mutations: {
    setQuizzes (state, payload) {
      state.quizzes = payload
    },
    setSelectedQuizId (state, id) {
      state.selectedQuizId = id
    }
  },
  actions: {
    async getQuizzes () {
      return await Api.get(`${baseURL}/${apiVersion}/quizzes`)
    },
    async getRating ({ commit }, quizId) {
      return Api.get(`${baseURL}/${apiVersion}/user/quizzes/${quizId}/rating`).then(res => res.result)
    },
    async getUserQuiz ({ commit }, { quizId, userId }) {
      return Api.get(`${baseURL}/${apiVersion}/user/${userId}/quizzes/${quizId}`)
    },
    async updateUserQuiz ({ commit }, { code, userId, quizId, time, answers, username }) {
      return await Api.put(`${baseURL}/${apiVersion}/user/${userId}/quizzes`, {
        data: {
          code,
          quiz_id: quizId,
          time,
          answers,
          username
        }
      })
    }
  }
}
