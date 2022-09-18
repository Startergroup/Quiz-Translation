import axios from 'axios'
import store from '../store'
import router from '../router'
import { baseURL } from './api.config'

class Api {
  #client

  constructor () {
    this.#client = axios.create({ baseURL })
  }

  async execute (method, url, { params = {}, data = {} }) {
    await store.dispatch('auth/checkTokens')

    const result = await this.#client({
      method,
      headers: {
        Authorization: `Bearer ${store.state.auth.access_token}`
      },
      url,
      params,
      data
    }).catch(err => {
      store.commit('Auth/setToken', {
        accessToken: null,
        refreshToken: null
      })
      router.push('/auth')
      throw new Error(err)
    })

    return result.data
  }

  get (url, params = {}) {
    return this.execute('get', url, { params })
  }

  post (url, { params = {}, data = {} }) {
    return this.execute('post', url, { params, data })
  }

  put (url, { params = {}, data = {} }) {
    return this.execute('put', url, { params, data })
  }

  delete (url, { params = {} }) {
    return this.execute('delete', url, { params })
  }
}

export default new Api()
