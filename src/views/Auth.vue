<template>
  <div class="flex flex-row h-screen w-full">
    <div class="lg:flex hidden flex-col items-center justify-end h-full w-1/2 bg-transparent px-10">
      <div class="flex flex-col items-center w-full my-auto relative top-14">
        <h2 v-html="getTitle" class="text-6xl font-bold text-black text-center mb-2"></h2>
        <p class="text-lg font-regular text-black text-center">{{ getSubtitle }}</p>
      </div>

      <img
        :src="LearningIcon"
        alt="learning"
        class=""
      >
    </div>

    <div class="flex flex-col justify-center items-center h-full lg:w-1/2 w-full px-4 lg:px-0 bg-white relative">
      <div class="flex flex-col lg:w-328 w-full max-w-328 shadow-md-y-0 px-5 py-6 bg-white rounded-2xl">
        <h2 class="text-xl font-normal text-black mb-6">{{ $t('message.authTitle') }}</h2>

        <div
          v-show="error"
          class="flex items-center justify-center w-full rounded-md bg-red-400 mb-4 py-2"
        >
          <span class="text-sm text-center font-semibold text-white uppercase">
            {{ error }}
          </span>
        </div>

        <form class="flex flex-col">
          <div class="flex flex-col w-full mb-4">
            <label class="text-sm text-black font-normal mb-1 ml-2">{{ $t('message.name') }}</label>
            <input
              v-model="name"
              type="text"
              class="input"
              @focus="error = null"
            >
          </div>

          <div class="flex flex-col w-full mb-8">
            <label class="text-sm text-black font-normal mb-1 ml-2">{{ $t('message.code') }}</label>
            <input
              v-model="code"
              type="password"
              class="input"
              @focus="error = null"
            >
          </div>

         <div class="flex flex-col w-full">
           <Button
             classes="button_primary"
             :value="$t('message.enterButton')"
             @on-click="login"
           />
         </div>
        </form>
      </div>

      <Localization class="absolute right-8 top-0" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import LearningIcon from '@/assets/svg/learning.svg'
import Localization from '@/components/Localization'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Auth',
  components: {
    Button,
    Localization
  },
  data () {
    return {
      LearningIcon,
      name: null,
      code: null,
      error: null
    }
  },
  computed: {
    ...mapState([
      'settings'
    ]),
    getTitle () {
      if (!this.settings) return ''

      const { title } = this.settings
      const currentLocale = title[this.$i18n.locale]
      const str = currentLocale.replace(/[0-9]/g, '').replace(/[^a-zа-яё0-9\s]/gi, '')
      const num = parseInt(currentLocale.match(/\d+/))

      return `${str}<span class="text-primary">/</span> ${num}`
    },
    getSubtitle () {
      if (!this.settings) return ''

      return this.settings.subtitle[this.$i18n.locale]
    }
  },
  methods: {
    ...mapActions('auth', [
      'onAuth'
    ]),
    async login () {
      try {
        const { success, message } = await this.onAuth({
          code: this.code,
          name: this.name
        })

        if (!success) {
          this.error = message
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        this.error = error
      }
    }
  }
}
</script>
