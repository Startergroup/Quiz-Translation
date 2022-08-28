<template>
  <div
    :class="[
      'button',
      classes
    ]"
    @click="$emit('onClick', $event)"
  >
    <slot name="content">
      {{ value }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    classes: {
      type: [Array, String],
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
