<template>
  <div class="timer button_outline">
    {{ formattedTime }}
  </div>
</template>

<script>
import timeFormatting from '@/utils/timeFormatting.js'

export default {
  name: 'Timer',
  props: {
    duration: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      timer: null,
      currentTime: null
    }
  },
  computed: {
    formattedTime () {
      return timeFormatting(this.currentTime)
    }
  },
  beforeUnmount () {
    this.stopTimer()
    this.updateSpentTime()
  },
  mounted () {
    this.currentTime = this.getSeconds(this.duration)
    this.startTimer()
  },
  methods: {
    startTimer () {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    getSeconds (time) {
      const [minutes, seconds] = time.split(':')
      return (parseInt(minutes) * 60) + parseInt(seconds)
    },
    updateSpentTime () {
      const spentTime = timeFormatting(this.getSeconds(this.duration) - this.currentTime)
      this.$emit('getSpentTime', spentTime)
    }
  },
  watch: {
    currentTime (time) {
      if (time === 0) {
        this.stopTimer()
        this.updateSpentTime()
        this.$emit('timeOver')
      }
    }
  }
}
</script>
