<template>
  <Sidebar
    :is-open="isOpen"
    :is-left="false"
    width="75%"
    @update:is-open="$emit('switch-schedule', false)"
  >
    <template #default>
      <div class="schedule">
        <div class="flex flex-row items-center justify-between w-full">
          <h2 class="schedule__title">SQA DAYS <span class="text-primary">/</span> 30 Программа</h2>

          <div class="flex flex-row items-center gap-3">
            <div class="schedule__button w-10">
              <IconBase
                name="arrow-left"
                width="24"
                height="24"
                stroke-color="#676767"
                stroke-width="2"
                :view-box-size="[24, 24]"
              />
            </div>

            <div class="schedule__button px-4">22.10.2022</div>

            <div class="schedule__button w-10">
              <IconBase
                name="arrow-right"
                width="24"
                height="24"
                stroke-color="#676767"
                stroke-width="2"
                :view-box-size="[24, 24]"
              />
            </div>
          </div>
        </div>

        <div class="schedule__container mt-8">
          <div
            v-for="(item, index) in schedule"
            :key="index"
            class="schedule__timeline"
          >
            <div class="flex items-center gap-2 w-full">
              <p class="text-sm text-secondary-4 font-medium">{{ item.timestamp }}</p>
              <div class="h-px w-full bg-secondary-4 rounded-full opacity-50"></div>
            </div>

            <div class="schedule__grid mt-2">
              <div
                v-for="(card, key) in item.items"
                :key="key"
                class="card h-64"
              >
                {{ card.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<script>
import IconBase from '@/components/Icons/IconBase'
import Sidebar from '@/components/UI/Sidebar'

export default {
  name: 'Schedule',
  components: {
    IconBase,
    Sidebar
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      schedule: [
        {
          timestamp: '09:00',
          items: [
            {
              name: '1'
            },
            {
              name: '1'
            },
            {
              name: '1'
            }
          ]
        },
        {
          timestamp: '10:00',
          items: [
            {
              name: '1'
            },
            {
              name: '1'
            },
            {
              name: '1'
            }
          ]
        },
        {
          timestamp: '11:00',
          items: [
            {
              name: '1'
            },
            {
              name: '1'
            },
            {
              name: '1'
            }
          ]
        },
        {
          timestamp: '12:00',
          items: [
            {
              name: '1'
            },
            {
              name: '1'
            },
            {
              name: '1'
            }
          ]
        },
        {
          timestamp: '13:00',
          items: [
            {
              name: '1'
            },
            {
              name: '1'
            },
            {
              name: '1'
            }
          ]
        }
      ]
    }
  }
}
</script>
