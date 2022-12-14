<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="flex items-center justify-center"
    content-class="w-full max-w-540 max-height-9/10 overflow-y-auto"
    :lock-scroll="false"
    :esc-to-close="true"
    @before-open="overwriteParams($event)"
  >
    <div class="flex flex-col items-start justify-center w-full bg-white rounded-md py-10 px-6 relative">
      <h2
        v-if="presentations && presentations.length"
        class="text-lg font-semibold text-black"
      >
        Голосование за доклад
      </h2>

      <div
        v-if="presentations && presentations.length"
        class="flex flex-col gap-4 mt-6"
      >
        <div
          v-for="(item, index) in presentations"
          :key="index"
          class="flex flex-row items-center gap-2"
        >
          <face-smile-icon
            :class="[
              'w-8 text-gray-400 transition-all duration-250 hover:text-primary cursor-pointer',
              { 'like-icon_active' : getUserVote(item.id) }
            ]"
            @click="onVotingHandler(item)"
          />
          <span class="text-base font-medium text-black w-11/12">{{ item.speaker }}</span>
        </div>
      </div>

      <div
        v-else
        class="flex items-center justify-center w-full mt-6"
      >
        <p class="text-sm text-gray-500 font-semibold">Голосование пока не проводится</p>
      </div>

      <x-circle-icon
        class="w-8 absolute right-6 top-6 text-black cursor-pointer"
        @click="onCloseHandler(close)"
      />
    </div>
  </vue-final-modal>
</template>

<script>
import ModalMixin from '@/mixins/Modal.mixin'
import { FaceSmileIcon, XCircleIcon } from '@heroicons/vue/24/outline'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'VoteModal',
  mixins: [ModalMixin],
  components: {
    FaceSmileIcon,
    XCircleIcon
  },
  data () {
    return {
      userVotes: null
    }
  },
  computed: {
    ...mapState([
      'selectedTabId'
    ]),
    ...mapState('vote', [
      'presentations',
      'votes'
    ]),
    ...mapState('auth', {
      userID: state => state.user.id
    })
  },
  async mounted () {
    const votes = await this.getVotes(this.selectedTabId)
    this.setVotes(votes)

    const { id } = votes

    if (!id) {
      return this.$vfm.hide()
    }

    const presentations = await this.getPresentations(id)
    this.setPresentations(presentations)

    this.userVotes = await this.getVote(this.userID)
  },
  methods: {
    ...mapActions('vote', [
      'getPresentations',
      'getVotes',
      'getVote',
      'vote'
    ]),
    ...mapMutations('vote', [
      'setPresentations',
      'setVotes'
    ]),
    getUserVote (presentationID) {
      if (!this.userVotes) return false
      return Boolean(this.userVotes.find(item => item.presentation_id === presentationID)?.is_liked)
    },
    async onCloseHandler (close) {
      await close()
      this.setVotes(null)
      this.setPresentations(null)
    },
    async onVotingHandler ({ id }) {
      const value = this.getUserVote(id)

      await this.vote({
        userID: this.userID,
        value: !value,
        presentationID: id
      })
      this.userVotes = await this.getVote(this.userID)
    }
  }
}
</script>
