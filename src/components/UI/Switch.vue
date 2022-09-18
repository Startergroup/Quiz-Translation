<template>
  <div class="flex flex-row items-center">
    <slot name="left-text" />

    <div
      :class="[
        'switch',
        classes
      ]"
      @click="onChangeState"
    >
      <div
        :class="[
          'switch__circle',
          { 'switch__circle_active' : isActive }
        ]"
      >
        <slot
          name="icon"
          :is-active="isActive"
        />
      </div>
    </div>

    <slot name="right-text" />
  </div>
</template>

<script>
export default {
  name: 'Switch',
  props: {
    classes: {
      type: [Array, String],
      default: ''
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    onChangeState () {
      this.isActive = !this.isActive
      this.$emit('update:switch-state', this.isActive)
    }
  }
}
</script>
