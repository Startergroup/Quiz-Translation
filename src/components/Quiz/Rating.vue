<template>
  <div
    v-if="rating"
    class="rating"
  >
    <img
      v-if="logoUrl"
      :src="`https://streamus.online/uploads/${logoUrl}`"
      alt="logo"
      class="introduction__logo flex mr-auto mb-8"
    >

    <h2 class="rating__h2">Топ 5 победителей</h2>

    <div class="table">
      <div class="table__row table__header_fill rounded-md">
        <div class="table__item">№</div>
        <div class="table__item">Имя</div>
        <div class="table__item">Правильные ответы</div>
        <div class="table__item">Время</div>
      </div>

      <div
        v-for="(item, index) in getBestRating"
        :key="index"
        class="table__row"
      >
        <div class="table__item">{{ index + 1 }}.</div>
        <div class="table__item">{{ item.username }}</div>
        <div class="table__item">{{ item.points }}</div>
        <div class="table__item">{{ item.time }}</div>
      </div>

      <div
        v-if="Object.keys(getCurrentUserRating).length"
        class="table__col"
      >
        <h2 class="table__header">Ваш результат:</h2>

        <div class="table__row table__row_highlight">
          <div class="table__item">{{ getCurrentUserRating.number }}.</div>
          <div class="table__item">{{ getCurrentUserRating.username }}</div>
          <div class="table__item">{{ getCurrentUserRating.points }}</div>
          <div class="table__item">{{ getCurrentUserRating.time }}</div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="loader"
  ></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'QuizRating',
  props: {
    quizId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    logoUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rating: null
    }
  },
  computed: {
    getBestRating () {
      if (!this.rating.length) return []
      return this.rating.slice(0, 5)
    },
    getCurrentUserRating () {
      if (!this.rating.length) return {}
      const getUserIndex = this.rating.findIndex(item => item.user_id === this.userId)

      return {
        ...this.rating[getUserIndex],
        number: (getUserIndex + 1)
      }
    }
  },
  watch: {
    quizId: {
      immediate: true,
      handler (value) {
        this.rating = null

        setTimeout(async () => {
          this.rating = await this.getRating(value)
        }, 3000)
      }
    }
  },
  methods: {
    ...mapActions('quiz', [
      'getRating'
    ])
  }
}
</script>
