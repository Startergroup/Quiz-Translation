<template>
  <div
    class="switch"
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
</template>

<script>
export default {
  name: 'Switch',
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
