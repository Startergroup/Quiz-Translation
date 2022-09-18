<template>
  <div class="flex flex-col items-center justify-center w-full h-full px-10 py-10">
    <div class="overview">
      <Switch
        class="ml-auto"
        @update:switch-state="isCinemaMode = $event"
      >
        <template #icon>
          <IconBase
            name="light"
            width="16"
            height="16"
            stroke-color="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :view-box-size="[16, 16]"
          />
        </template>
      </Switch>

      <Video class="mt-4" />

      <Actions
        class="mt-4"
        @switch-schedule="scheduleIsOpen = $event"
      />
    </div>
  </div>

  <Menu />

  <Schedule
    :is-open="scheduleIsOpen"
    @switch-schedule="scheduleIsOpen = $event"
  />

  <div
    v-show="isCinemaMode"
    class="cinema-mode"
  ></div>
</template>

<script>
import Actions from '@/components/Actions'
import IconBase from '@/components/Icons/IconBase'
import Menu from '@/components/Menu'
import Schedule from '@/components/Schedule'
import Switch from '@/components/UI/Switch'
import Video from '@/components/Video'

export default {
  name: 'Home',
  components: {
    Actions,
    IconBase,
    Menu,
    Schedule,
    Switch,
    Video
  },
  data () {
    return {
      scheduleIsOpen: false,
      isCinemaMode: false
    }
  }
}
</script>
