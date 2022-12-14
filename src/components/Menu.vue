<template>
  <div
    class="menu"
    @click="isOpen = true"
  >
    <IconBase
      name="menu"
      class="menu__icon"
      :view-box-size="[24, 16]"
      :width="24"
      :height="16"
      fill="#6C63FF"
    />
  </div>

  <Sidebar
    :is-open="isOpen"
    @update:is-open="isOpen = $event"
  >
    <template #default>
      <div class="flex flex-col w-full py-10">
        <h2 v-html="getTitle" class="text-2xl font-bold text-black text-center"></h2>

        <div class="flex flex-col mt-10 pl-6 w-full">
          <Button
            v-for="(item, index) in tabs"
            :key="index"
            :classes="[
              'button button_empty rounded-l-3xl rounded-r-none justify-start pl-5',
              { 'menu__button_active': selectedTabId === item.id }
            ]"
            @click="selectTabHandler(item.id)"
          >
            <template #content>
              {{ item.name }}
            </template>
          </Button>
        </div>

        <div class="flex flex-col mt-10 pl-6 w-full">
          <Button
            classes="button font-semibold rounded-l-3xl rounded-r-none justify-start pl-5 hover:bg-red-400 hover:text-white"
            :value="$t('message.logout')"
            @on-click="logoutHandler"
          />
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Button from '@/components/UI/Button'
import IconBase from '@/components/Icons/IconBase'
import Sidebar from '@/components/UI/Sidebar'

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Button,
    IconBase,
    Sidebar
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapState([
      'tabs',
      'selectedTabId'
    ]),
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
    }
  },
  async updated () {
    await this.updateTabsHandler()
  },
  async mounted () {
    await this.updateTabsHandler()
  },
  methods: {
    ...mapActions(['getTabs']),
    ...mapActions('auth', [
      'logout'
    ]),
    ...mapMutations([
      'setTabs',
      'selectTab'
    ]),
    logoutHandler () {
      this.logout()
      this.$router.push('/auth')
    },
    selectTabHandler (id) {
      this.selectTab(id)
      this.isOpen = false
    },
    async updateTabsHandler () {
      const tabs = await this.getTabs()
      this.setTabs(tabs)
    }
  }
}
</script>
