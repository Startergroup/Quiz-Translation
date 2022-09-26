<template>
  <router-view/>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('auth', [
      'refresh_token',
      'timer'
    ])
  },
  async mounted () {
    const { result: { title, favicon } } = await this.getSettings()
    const authData = localStorage.getItem('streamusUserTokens')

    document.title = title
    document.querySelector('link[rel="icon"]').setAttribute('href', favicon)

    if (authData) {
      const { accessToken, refreshToken, expires, code, lastActivity, username } = JSON.parse(authData)

      this.setTokens({
        accessToken,
        refreshToken,
        expires
      })
      this.setCode(code)
      this.setActivity(lastActivity)
      this.setUsername(username)
    } else {
      this.setTokens({
        accessToken: null,
        refreshToken: null,
        expires: null
      })
    }
  },
  methods: {
    ...mapMutations('auth', [
      'setTokens',
      'setActivity',
      'setCode',
      'setUsername'
    ]),
    ...mapActions([
      'getSettings'
    ])
  }
}
</script>
