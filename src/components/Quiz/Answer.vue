<template>
  <div
    :class="classes"
    @click="$emit('onClick', answer)"
  >
    {{ answer.value }}
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    answer: {
      type: Object,
      required: true
    },
    classes: {
      type: String,
      default: 'button button_primary h-auto py-2 px-4 break-words'
    }
  }
}
</script>
