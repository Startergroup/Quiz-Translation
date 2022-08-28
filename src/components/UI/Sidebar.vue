<template>
  <div class="sidebar">
    <div
      :class="[
        'sidebar__wrapper',
        { 'sidebar__wrapper_active' : isOpen },
        isLeft ? 'sidebar__wrapper_left' : 'sidebar__wrapper_right'
      ]"
      :style="getComputedStyle"
    >
      <slot />
    </div>

    <div
      v-show="isOpen"
      class="sidebar__layout"
      @click="$emit('update:is-open', false)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    isLeft: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: '245px'
    }
  },
  computed: {
    getComputedStyle () {
      if (typeof this.width === 'number') {
        return { width: `${this.width}px` }
      } else {
        return { width: this.width }
      }
    }
  }
}
</script>
