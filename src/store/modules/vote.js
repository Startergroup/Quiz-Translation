import Api from '@/api/api'
import { baseURL, apiVersion } from '@/api/api.config'

export default {
  namespaced: true,
  state: {
    presentations: null,
    votes: null
  },
  mutations: {
    setPresentations (state, presentations) {
      state.presentations = presentations
    },
    setVotes (state, votes) {
      state.votes = votes
    }
  },
  actions: {
    async getVotes ({ commit }, id) {
      return Api.get(`${baseURL}/${apiVersion}/vote/${id}`)
    },
    async getPresentations ({ commit }, id) {
      return Api.get(`${baseURL}/${apiVersion}/presentation/${id}`)
    },
    async vote ({ commit }, { userID, presentationID, value }) {
      return Api.post(`${baseURL}/${apiVersion}/user/vote`, {
        data: {
          userID,
          presentationID,
          value
        }
      })
    },
    async getVote ({ commit }, userId) {
      return Api.get(`${baseURL}/${apiVersion}/user/${userId}/voting`)
    }
  }
}
