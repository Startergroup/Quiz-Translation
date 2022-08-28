<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${viewBoxSize[0]} ${viewBoxSize[1]}`"
    :aria-labelledby="name"
    role="presentation"
  >
    <title v-if="showTitle" :id="name" lang="en">{{ title }}</title>

    <g
      v-if="isSettingsArray"
      :fill="fill"
    >
      <path
        v-for="(path) in icons[name]"
        :d="path"
        :key="path"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        :stroke-linejoin="strokeLinejoin"
        :stroke="strokeColor"
      />
    </g>

    <g
      v-else
      v-html="icons[name]"
      :fill="fill"
    ></g>
  </svg>
</template>

<script>
import icons from '@/utils/icons'

export default {
  props: {
    name: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    viewBoxSize: {
      type: Array,
      default: () => ([24, 24])
    },
    fill: {
      type: String,
      default: 'none'
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    strokeWidth: {
      type: [Number, String],
      default: 0
    },
    strokeLinecap: {
      type: [Number, String],
      default: ''
    },
    strokeLinejoin: {
      type: String,
      default: ''
    },
    strokeColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icons
    }
  },
  computed: {
    isSettingsArray () {
      return Array.isArray(this.icons[this.name])
    }
  }
}
</script>
