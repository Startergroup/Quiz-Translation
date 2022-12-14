<template>
  <div
    v-if="!isClose"
    class="quizlet"
    :style="getComputedStyle"
  >
    <div class="quizlet__layout">
      <div
        v-if="!hasQuizStarted && !isFinished"
        class="quizlet__wrapper"
      >
        <Introduction
          :title="quizlet.introductionText"
          :logoURL="quizlet.logoURL"
          @startGame="startGame"
        >
          <template #form="{ startQuizlet }">
            <slot
              name="introductionForm"
              :start-quizlet="startQuizlet"
            />
          </template>
        </Introduction>
      </div>

      <div
        v-else-if="currentQuestion && !isFinished"
        class="quizlet__wrapper"
      >
        <header class="quizlet__header">
          <img
            v-if="quizlet.logoURL"
            :src="`https://streamus.online/uploads/${quizlet.logoURL}`"
            alt="Logo"
            class="logo"
          >

          <Timer
            :duration="quizlet.duration"
            @getSpentTime="setSpentTime($event)"
            @timeOver="timeOver"
          />
        </header>

        <Question :value="currentQuestion.value" />

        <div class="answers">
          <Answer
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            :answer="answer"
            @onClick="selectAnswer($event)"
          />
        </div>

        <ProgressBar
          :currentNumberQuestion="count"
          :totalNumberQuestions="getQuestions.length"
        />
      </div>

      <span
        v-else-if="!quizlet.isActive"
        class="text-lg font-semibold text-gray-600 text-center"
      >
        Квиз еще не начался
      </span>

      <div
        v-else
        class="flex mb-auto"
      >
        <Rating
          :logo-url="quizlet.logoURL"
          :quiz-id="quizlet.id"
          :user-id="user.id"
        />
      </div>

      <IconBase
        class="absolute right-3 top-3 cursor-pointer"
        name="x-circle-icon"
        fill="#323232"
        @click="setSelectedQuizId(null)"
      />
    </div>
  </div>
</template>

<script>
import Answer from './Answer.vue'
import IconBase from '@/components/Icons/IconBase'
import Introduction from './Introduction.vue'
import Question from './Question.vue'
import ProgressBar from './ProgressBar.vue'
import Timer from './Timer.vue'
import Rating from './Rating'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Quizlet',
  props: {
    quizlet: {
      type: Object,
      required: true
    }
  },
  components: {
    Answer,
    IconBase,
    Introduction,
    Question,
    ProgressBar,
    Timer,
    Rating
  },
  data () {
    return {
      count: 0,
      hasQuizStarted: false,
      isClose: false,
      isFinished: false,
      results: {
        id: null,
        time: null,
        answers: []
      }
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    getQuestions () {
      return this.quizlet.questions
    },
    currentQuestion () {
      return this.getQuestions[this.count]
    },
    getComputedStyle () {
      if (!this.quizlet) return {}

      return {
        background: `${this.quizlet.bgColor}`
      }
    }
  },
  async mounted () {
    await this.updateUserState()
  },
  watch: {
    async quizlet () {
      await this.updateUserState()
    }
  },
  methods: {
    ...mapActions('quiz', [
      'getUserQuiz'
    ]),
    ...mapMutations('quiz', [
      'setSelectedQuizId'
    ]),
    async selectAnswer (answer) {
      this.updateAnswers(answer)
      this.count++

      if (this.count === this.getQuestions.length) {
        this.results.id = this.quizlet.id
        await this.$nextTick()
        this.$emit('finishQuizlet', { ...this.results })
      }
    },
    setSpentTime (time) {
      this.results.time = time
    },
    startGame () {
      this.hasQuizStarted = true
    },
    timeOver () {
      this.results._id = this.quizlet.id
      this.results.answers = []
      this.$emit('finishQuizlet', { results: this.results })
    },
    updateAnswers (answer) {
      this.results.answers.push(answer)
    },
    async updateUserState () {
      this.isFinished = await this.getUserQuiz({
        quizId: this.quizlet.id,
        userId: this.user.id
      }).then(res => res.isPassed || !this.quizlet.isActive)
    }
  }
}
</script>
