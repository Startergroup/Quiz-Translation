import { createStore } from 'vuex'
import Api from '@/api/api'
import { apiVersion } from '@/api/api.config'

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
  actions: {
    async getTabs () {
      return await Api.get(`${apiVersion}/translation/tabs`).then(res => res.result)
    }
  }
})
