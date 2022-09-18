<template>
  <Switch
    class="mt-10 ml-9 gap-3"
    :classes="['switch_sm switch_dark']"
    @update:switch-state="changeLocalization($event)"
  >
    <template #left-text>
      <span class="text-base font-semibold text-black">RU</span>
    </template>

    <template #right-text>
      <span class="text-base font-semibold text-black">EN</span>
    </template>
  </Switch>
</template>

<script>
import Switch from '@/components/UI/Switch'

export default {
  name: 'Localization',
  components: {
    Switch
  },
  methods: {
    changeLocalization (state) {
      this.$i18n.locale = state ? 'en' : 'ru'
    }
  }
}
</script>
