<template>
  <router-view/>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('auth', [
      'refresh_token',
      'timer'
    ])
  },
  mounted () {
    const authData = localStorage.getItem('streamusUserTokens')

    if (authData) {
      const { accessToken, refreshToken, expires, code, lastActivity } = JSON.parse(authData)

      this.setTokens({
        accessToken,
        refreshToken,
        expires
      })
      this.setCode(code)
      this.setActivity(lastActivity)
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
      'setCode'
    ])
  }
}
</script>
