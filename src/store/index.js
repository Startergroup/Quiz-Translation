import { createStore } from 'vuex'
import Api from '@/api/api'
import { apiVersion } from '@/api/api.config'
import auth from './modules/auth'
import user from './modules/user'

export default createStore({
  state: {
    tabs: null,
    selectedTabId: null
  },
  mutations: {
    setTabs (state, tabs) {
      state.tabs = tabs
    },
    selectTab (state, id) {
      state.selectedTabId = id
    }
  },
  getters: {
    currentTab (state) {
      if (!state.tabs) return null
      return state.tabs.find(item => parseInt(item.id) === parseInt(state.selectedTabId))
    }
  },
  actions: {
    async getTabs () {
      return await Api.get(`${apiVersion}/translation/tabs`).then(res => res.result)
    }
  },
  modules: {
    auth,
    user
  }
})
