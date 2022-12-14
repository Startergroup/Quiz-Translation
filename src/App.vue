<template>
  <router-view/>
  <modals-container></modals-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  async mounted () {
    const { result: { title, subtitle, favicon } } = await this.getSettings()

    this.setSettings({ title, favicon, subtitle })

    document.title = title[this.$i18n.locale]
    document.querySelector('link[rel="icon"]').setAttribute('href', favicon)
  },
  created () {
    const userData = localStorage.getItem('streamusUserData')

    if (userData) {
      const user = JSON.parse(userData)
      this.setUser(user)
    } else {
      this.setTokens({
        accessToken: null,
        refreshToken: null,
        expires: null
      })
    }
  },
  methods: {
    ...mapMutations([
      'setSettings'
    ]),
    ...mapMutations('auth', [
      'setTokens',
      'setUser'
    ]),
    ...mapActions([
      'getSettings'
    ])
  }
}
</script>
