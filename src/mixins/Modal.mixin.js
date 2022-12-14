export default {
  data () {
    return {
      isOpen: false,
      params: {},
      rendering: true,
      onClose: null
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler (val) {
        this.isOpen = val
        this.rendering = val
      }
    }
  },
  methods: {
    overwriteParams (event, close) {
      this.params = {}
      this.params = event.ref.params._value
      this.onClose = close
    }
  }
}
