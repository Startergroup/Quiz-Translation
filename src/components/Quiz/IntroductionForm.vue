<template>
  <form action="" class="introduction__form">
    <button
      class="introduction__button button button_primary"
      @click.prevent="handleClick"
    >
      Участвую!
    </button>
  </form>
</template>

<script>
export default {
  name: 'IntroductionForm',
  props: {
    startQuizlet: {
      type: Function,
      required: true
    },
    username: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.startQuizlet()
    }
  }
}
</script>
