<template>
  <div class="flex flex-row justify-between items-center w-full rounded-2xl bg-white px-8 py-2">
    <p
      v-if="currentTab"
      class="text-base text-secondary-2 font-medium"
    >
      <span class="text-black font-bold">{{ currentTab.name }}</span>
    </p>

    <div class="flex flex-row items-center gap-3 ml-auto">
      <Button
        v-for="(item, index) in icons"
        :key="index"
        :classes="item.classes"
        :title="item.title"
        @click="item.onClick"
      >
        <template #content>
          <IconBase
            :name="item.name"
            :width="item.width"
            :height="item.height"
            :stroke-color="item.strokeColor"
            :stroke-width="item.strokeWidth"
            :stroke-linecap="item.strokeLinecap"
            :stroke-linejoin="item.strokeLinejoin"
            :view-box-size="item.viewBoxSize"
            :title="item.title"
          />
        </template>
      </Button>
    </div>

    <Comments
      :is-comments-open="isCommentsOpen"
      @update:comments="isCommentsOpen = $event"
    />
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import Comments from '@/components/Comments'
import IconBase from '@/components/Icons/IconBase'

import { mapGetters } from 'vuex'

export default {
  name: 'Actions',
  components: {
    Button,
    Comments,
    IconBase
  },
  data () {
    return {
      isCommentsOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'currentTab'
    ]),
    icons () {
      return [
        // {
        //   name: 'article',
        //   classes: 'button_primary rounded-full w-10',
        //   width: '23',
        //   height: '24',
        //   strokeColor: '#fff',
        //   strokeWidth: '1.5',
        //   strokeLinecap: 'round',
        //   strokeLinejoin: 'round',
        //   viewBoxSize: [23, 24],
        //   onClick: () => {
        //     this.$emit('switch-schedule', true)
        //   }
        // },
        {
          name: 'chat',
          classes: 'button_primary rounded-full w-10',
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24],
          title: this.$t('message.chatTitle'),
          onClick: () => {
            this.isCommentsOpen = true
          }
        }
        // {
        //   name: 'chartBar',
        //   classes: 'button_primary rounded-full w-10',
        //   width: '23',
        //   height: '24',
        //   strokeColor: '#fff',
        //   strokeWidth: '1.5',
        //   strokeLinecap: 'round',
        //   strokeLinejoin: 'round',
        //   viewBoxSize: [23, 24]
        // }
      ]
    }
  }
}
</script>
