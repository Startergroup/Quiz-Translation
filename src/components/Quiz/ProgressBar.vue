<template>
  <div class="wrapper">
    <div class="progress-bar">
      <div
        class="progress-bar__line"
        :style="computedStyles"
      />
    </div>

    <div class="progress-bar__score">
      {{ currentNumberQuestion }} / {{ totalNumberQuestions }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    currentNumberQuestion: {
      type: Number,
      required: true
    },
    totalNumberQuestions: {
      type: Number,
      required: true
    }
  },
  computed: {
    calculationProgress () {
      return this.currentNumberQuestion ? ((this.currentNumberQuestion / this.totalNumberQuestions) * 100) : 0
    },
    computedStyles () {
      return {
        width: `${this.calculationProgress}%`
      }
    }
  }
}
</script>
