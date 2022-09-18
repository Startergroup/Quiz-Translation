<template>
  <Sidebar
    :is-open="isCommentsOpen"
    :is-bottom="true"
    width="50%"
    @update:is-open="$emit('update:comments', $event)"
  >
    <template #default>
      <div class="flex flex-col justify-start items-start w-full px-8 py-6 h-full relative">
        <h1
          class="text-xl font-bold text-primary mb-6"
          @click="hideComment"
        >
          {{ $t("message.questionTitle") }}
        </h1>

        <div
          :class="[
            'flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 m-auto w-80 h-12 rounded-lg bg-green-500 transition transition-all duration-500 successfully_hide',
            { 'successfully_show' : successfully }
          ]"
        >
          <span class="text-base font-semibold text-white">
            {{ $t("message.questionMessage") }}
          </span>
        </div>

        <div class="flex flex-col w-full items-start">
          <input
            v-model="username"
            type="text"
            :placeholder="$t('message.questionInput')"
            :class="[
              'input mb-4',
              { 'border-red-300' : isEmptyInput }
            ]"
            @focus="isEmptyInput = false"
          >

          <textarea
            v-model="comment"
            :class="[
              'textarea mb-8',
              { 'comment_error' : isEmptyTextarea }
            ]"
            @focus="isEmptyTextarea = false"
            @keyup.ctrl.enter.prevent="newLine($event)"
            @keydown.enter.prevent.exact="sendComment"
          ></textarea>

          <Button
            classes="button_primary w-28"
            :value="$t('message.questionButton')"
            @on-click="sendComment"
          />
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<script>
import Button from '@/components/UI/Button'
import Sidebar from '@/components/UI/Sidebar'

import { getDatabase, ref, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'Comments',
  components: {
    Button,
    Sidebar
  },
  props: {
    isCommentsOpen: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      isEmptyInput: false,
      isEmptyTextarea: false,
      username: null,
      comment: null,
      successfully: false
    }
  },
  computed: {
    ...mapGetters([
      'currentTab'
    ])
  },
  methods: {
    sendComment () {
      if (!(this.username && this.comment)) {
        this.isEmptyInput = !this.username
        this.isEmptyTextarea = !this.comment

        return false
      }

      if (!this.currentTab) {
        return alert(this.$t('message.errorComments'))
      }

      const db = getDatabase()
      const date = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

      set(ref(db, `${this.currentTab.name}/${uuidv4()}`), {
        username: this.username,
        comment: this.comment,
        date: date
      })

      this.showSuccessMessage()

      this.comment = null
      this.username = null
    },
    hideComment () {
      this.isEmptyInput = false
      this.isEmptyTextarea = false
    },
    showSuccessMessage () {
      this.successfully = true
      setTimeout(() => {
        this.successfully = false
        this.$emit('update:comments', false)
      }, 1500)
    },
    newLine (event) {
      const caret = event.target.selectionStart

      event.target.setRangeText('\n', caret, caret, 'end')
      this.comment = event.target.value
    }
  }
}
</script>
