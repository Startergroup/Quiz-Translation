<template>
  <Sidebar
    :is-open="isOpen"
    :is-left="true"
    width="260px"
    @update:is-open="$emit('update:quiz', $event)"
  >
    <template #default>
      <div class="flex flex-col w-full py-10 pl-10 overflow-y-auto max-height-9/10">
        <h2 class="text-2xl font-semibold text-black">Квизы</h2>

        <div
          v-if="quizzes === null"
          class="flex flex-col mt-6"
        >
          <Button
            v-for="item in 5"
            :key="item"
            classes="button button_empty button_non-hover rounded-l-3xl rounded-r-none justify-start pl-5"
          >
            <template #content>
              <span class="animate-pulse bg-gray-300 text-gray-300 w-full rounded-l-3xl">1231231231</span>
            </template>
          </Button>
        </div>

        <div
          v-else-if="quizzes && quizzes.length"
          class="flex flex-col mt-6"
        >
          <Button
            v-for="item in quizzes"
            :key="item.id"
            :classes="[
              'button button_empty rounded-l-3xl rounded-r-none justify-start pl-5 py-2 h-auto',
              { 'button_primary button_non-hover' : selectedQuizId === item.id },
            ]"
            @click="onSelectQuiz(item)"
          >
            <template #content>
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full mr-2',
                  item.isPassed ? 'bg-green-500' : 'bg-red-400'
                ]"
              ></div>
              <span class="text-sm font-semibold max-w-64%">{{ item.name }}</span>
              <ChevronRightIcon class="w-4 ml-4" />
            </template>
          </Button>
        </div>

        <span v-else class="text-base font-semibold text-gray-700 text-left mt-8">Пока квизов нет</span>
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Button from '@/components/UI/Button'
import Sidebar from '@/components/UI/Sidebar'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Quizzes',
  components: {
    Button,
    ChevronRightIcon,
    Sidebar
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('quiz', [
      'quizzes',
      'selectedQuizId'
    ])
  },
  methods: {
    ...mapMutations('quiz', [
      'setSelectedQuizId'
    ]),
    onSelectQuiz ({ id }) {
      this.setSelectedQuizId(id)
      this.$emit('update:quiz', false)
    }
  }
}
</script>
