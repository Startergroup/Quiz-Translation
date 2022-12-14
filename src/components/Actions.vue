<template>
  <div class="flex flex-row justify-between items-center w-full rounded-2xl bg-white px-8 py-2 z-20 relative">
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
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import IconBase from '@/components/Icons/IconBase'
import VoteModal from '@/components/Modals/VoteModal'

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Actions',
  components: {
    Button,
    IconBase
  },
  data () {
    return {
      isCommentsOpen: false
    }
  },
  computed: {
    ...mapState([
      'selectedTabId'
    ]),
    ...mapGetters([
      'currentTab'
    ]),
    icons () {
      return [
        {
          name: 'quiz',
          classes: 'button_primary rounded-full w-10',
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24],
          onClick: () => {
            this.$emit('open:quiz', true)
          }
        },
        {
          name: 'question',
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
            this.$emit('open:comments', true)
          }
        },
        {
          name: 'survey',
          classes: `button_primary rounded-full w-10 ${!this.selectedTabId && 'button_disable'}`,
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24],
          onClick: () => {
            if (!this.selectedTabId) return

            this.$vfm.show({
              component: VoteModal
            })
          }
        }
      ]
    }
  }
}
</script>
