<template>
  <router-view/>
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
  methods: {
    ...mapMutations([
      'setSettings'
    ]),
    ...mapActions([
      'getSettings'
    ])
  }
}
</script>
