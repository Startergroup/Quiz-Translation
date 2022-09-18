<template>
  <div class="sidebar">
    <div
      :class="[
        'sidebar__wrapper',
        { 'sidebar__wrapper_active' : isOpen },
        { 'sidebar__wrapper_bottom' : isBottom },
        { 'sidebar__wrapper_left' : isLeft && !isBottom },
        { 'sidebar__wrapper_right' : !isLeft && !isBottom }
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
    isBottom: {
      type: Boolean,
      default: false
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
