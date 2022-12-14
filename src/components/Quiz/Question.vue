<template>
  <div class="question">
    <h2 class="question__h2">{{ value }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
