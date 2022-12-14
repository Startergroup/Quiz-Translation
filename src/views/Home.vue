<template>
  <div class="flex flex-col items-center justify-center w-full h-full md:px-10 md:py-10 py-6 px-6">
    <div class="overview">
      <Switch
        class="ml-auto"
        :classes="[{ 'switch_dark' : isCinemaMode }]"
        @update:switch-state="isCinemaMode = $event"
      >
        <template #icon>
          <IconBase
            name="light"
            width="16"
            height="16"
            stroke-color="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :view-box-size="[16, 16]"
          />
        </template>
      </Switch>

      <Video class="2xl:mt-4 mt-12">
        <template #overview>
          <Quizlet
            v-if="selectedQuiz"
            :quizlet="selectedQuiz"
            :is-finished="isPassed"
            @finish-quizlet="finishQuiz($event)"
          >
            <template #introductionForm="{ startQuizlet }">
              <IntroductionForm
                :start-quizlet="startQuizlet"
                :username="user.username"
              />
            </template>
          </Quizlet>
        </template>
      </Video>

      <Actions
        class="mt-4"
        @open:comments="isCommentsOpen = $event"
        @open:quiz="onOpenQuizzes($event)"
      />
    </div>
  </div>

  <Menu />

  <Comments
    :is-open="isCommentsOpen"
    @update:comments="isCommentsOpen = $event"
  />

  <Quizzes
    :is-open="isQuizOpen"
    @update:quiz="isQuizOpen = $event"
  />

  <div
    :class="[
      'cinema-mode',
      { 'cinema-mode_active' : isCinemaMode }
    ]"
  ></div>
</template>

<script>
import Actions from '@/components/Actions'
import Comments from '@/components/Comments'
import IconBase from '@/components/Icons/IconBase'
import IntroductionForm from '@/components/Quiz/IntroductionForm'
import Quizlet from '@/components/Quiz/Quizlet'
import Quizzes from '@/components/Quizzes'
import Menu from '@/components/Menu'
import Switch from '@/components/UI/Switch'
import Video from '@/components/Video'

import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    Actions,
    Comments,
    IconBase,
    IntroductionForm,
    Quizlet,
    Quizzes,
    Menu,
    Switch,
    Video
  },
  data () {
    return {
      isCinemaMode: false,
      isCommentsOpen: false,
      isQuizOpen: false,
      quizzes: null
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    ...mapState('quiz', {
      isPassed: state => state.isPassed
    }),
    ...mapGetters([
      'currentTab'
    ]),
    ...mapGetters('quiz', [
      'selectedQuiz'
    ]),
    getComputedStyle () {
      if (!this.selectedQuiz) return {}

      return {
        background: this.selectedQuiz.bgColor
      }
    }
  },
  methods: {
    ...mapActions('quiz', [
      'getQuizzes',
      'getUserQuiz',
      'updateUserQuiz'
    ]),
    ...mapMutations('quiz', [
      'setQuizzes'
    ]),
    async finishQuiz (result) {
      const { id: quizId, time, answers } = result

      const { success, message = null } = await this.updateUserQuiz({
        code: this.user.code,
        userId: this.user.id,
        username: this.user.username,
        quizId,
        time,
        answers
      })

      if (!success) {
        alert(message)
      }
    },
    async onOpenQuizzes (state) {
      this.isQuizOpen = state

      const { id } = this.user
      const quizzes = await this.getQuizzes()

      for (let i = 0; i < quizzes.length; i++) {
        const item = quizzes[i]

        item.isPassed = await this.getUserQuiz({
          quizId: item.id,
          userId: id
        }).then(res => res.isPassed)
      }

      this.setQuizzes(quizzes)
    }
  }
}
</script>
