<template>
  <div
    v-if="targetQuizlet && !isClosed"
    class="translation-quizlet"
    :style="getComputedStyle"
  >
    <quiz-package
      :quizlet="targetQuizlet"
      :isFinished="isQuizletAlreadyPassed"
      @finishQuizlet="finishQuizlet($event)"
    >
      <template #introductionForm="{ startQuizlet }">
        <quiz-form
          :start-quizlet="startQuizlet"
          :user="user"
          @updateUser="updateUser($event)"
        />
      </template>

      <template #finalFrame>
        <quiz-rating
          v-if="targetQuizlet._id && user._id"
          :quizlet_id="targetQuizlet._id"
          :user_id="user._id"
        />
      </template>
    </quiz-package>

    <XCircleIcon
      class="translation-quizlet__close"
      @click="isClosed = true"
    />
  </div>
</template>

<script>
import QuizPackage from 'startergroup-quizlet'
import QuizForm from './QuizForm'
import QuizRating from './QuizRating'

import { mapActions, mapState } from 'vuex'
import { baseURL } from '@/api/api.config'
import { XCircleIcon } from '@vue-hero-icons/outline'
import Api from '@/api/api'

export default {
  name: 'Quiz',
  components: {
    QuizPackage,
    QuizForm,
    QuizRating,
    XCircleIcon
  },
  data () {
    return {
      user: null,
      isClosed: false
    }
  },
  computed: {
    ...mapState('user', {
      quizzes: state => state.quizzes
    }),
    ...mapState('auth', {
      code: state => state.code
    }),
    targetQuizlet () {
      return this.quizzes ? this.quizzes.find(item => item.section === this.activeTab.tab_name && item.isActive) : false
    },
    isQuizletAlreadyPassed () {
      if (!(this.user)) return false
      return this.user.quizzes.includes(this.targetQuizlet._id)
    },
    getComputedStyle () {
      if (!this.targetQuizlet) return
      return {
        background: `${this.targetQuizlet.bgColor}`
      }
    }
  },
  async mounted () {
    await this.initUser()
    this.getQuizzes()
  },
  methods: {
    ...mapActions('user', [
      'getQuizzes',
      'getUser'
    ]),
    async initUser () {
      const user = await this.getUser(this.code)

      if (user) {
        this.user = user
        this.user.answers = []
      } else {
        this.user = await Api.post(`${baseURL}/user/create`, {
          data: {
            _key: this.code,
            username: localStorage.getItem('werialUsername') || ''
          }
        }).then(res => res.payload.user)
      }
    },
    async updateUser (user) {
      this.user = await Api.put(`${baseURL}/user/update`, {
        data: {
          username: user.username,
          _key: user._key,
          quizlet_id: this.targetQuizlet._id,
          user_id: user._id
        }
      }).then(res => res.data)
      this.user.answers = []
    },
    finishQuizlet (payload) {
      setTimeout(async () => {
        const { answers, _id, time } = payload.results

        await Api.put(`${baseURL}/user/update/quizzes`, {
          data: {
            quizlet_id: _id,
            user_id: this.user._id,
            time
          }
        })
        await Api.put(`${baseURL}/user/update/answers`, {
          data: {
            user_id: this.user._id,
            quizlet_id: _id,
            answers
          }
        })
      }, 2000)
    }
  },
  watch: {
    targetQuizlet () {
      this.isClosed = false
    }
  }
}
</script>

<style lang="scss">
.translation-quizlet {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 99999;
  left: 0;
  top: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-height: 510px;
  background: rgba(#2a67c9, .95);

  .quizlet {
    position: relative;
    max-height: 85%;
    overflow-y: auto;

    .logo {
      max-height: 100px;
      object-fit: cover;
    }

    .wrapper {
      height: inherit;
      margin: 0;
    }
  }

  &__close {
    position: absolute;
    right: 25px;
    top: 25px;
    color: #fff;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
}
</style>
