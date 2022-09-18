<template>
  <div
    :class="[
      'video',
      { 'video_black' : !currentTab }
    ]"
  >
    <vue-plyr
      v-if="currentTab"
      ref="plyr"
    >
      <div class="video mt-4">
        <iframe
          :src="videoURL"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr>

    <span
      v-else
      class="text-2xl font-semibold text-white"
    >
      {{ $t('message.videoHint') }}
    </span>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr'
import { mapGetters } from 'vuex'
import 'vue-plyr/dist/vue-plyr.css'

export default {
  name: 'Video',
  components: {
    VuePlyr
  },
  computed: {
    ...mapGetters([
      'currentTab'
    ]),
    videoURL () {
      return this.currentTab.url
    }
  }
}
</script>
