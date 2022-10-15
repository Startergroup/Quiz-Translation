import store from '../../store'

export async function checkAuth (to, from, next) {
  const timer = store.state.auth.timer
  const userData = localStorage.getItem('streamusUserTokens')

  if (userData) {
    const { accessToken, refreshToken, expires, code, lastActivity, username } = JSON.parse(userData)

    store.commit('auth/setTokens', {
      accessToken,
      refreshToken,
      expires
    })
    store.commit('auth/setCode', code)
    store.commit('auth/setActivity', lastActivity)
    store.commit('auth/setUsername', username)
  } else {
    store.commit('auth/setTokens', {
      accessToken: null,
      refreshToken: null,
      expires: null
    })
  }

  if (to.matched.some(record => record.meta.protected)) {
    if (timer) {
      clearInterval(timer)
    }

    if (store.getters['auth/isLogged']) {
      const newTimer = setInterval(() => {
        store.dispatch('auth/updateActivity')
      }, 10000)

      store.commit('auth/setTimer', newTimer)
      return next()
    }

    return next('/auth')
  }

  clearInterval(timer)

  return next()
}
