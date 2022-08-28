<template>
  <div class="flex flex-row justify-between items-center w-full rounded-2xl bg-white px-8 py-2">
    <p class="text-base text-secondary-2 font-medium">
      <span class="text-black font-bold">Секция А:</span>
      Автоматизация мобильной игры на основе AirTest IDE
    </p>

    <div class="flex flex-row items-center gap-3">
      <Button
        v-for="(item, index) in icons"
        :key="index"
        :classes="item.classes"
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
          />
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import IconBase from '@/components/Icons/IconBase'

export default {
  name: 'Actions',
  components: {
    Button,
    IconBase
  },
  data () {
    return {
      icons: [
        {
          name: 'article',
          classes: 'button_primary rounded-full w-10',
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24],
          onClick: () => {
            this.$emit('switch-schedule', true)
          }
        },
        {
          name: 'chat',
          classes: 'button_primary rounded-full w-10',
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24]
        },
        {
          name: 'chartBar',
          classes: 'button_primary rounded-full w-10',
          width: '23',
          height: '24',
          strokeColor: '#fff',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          viewBoxSize: [23, 24]
        }
      ]
    }
  }
}
</script>
