<template>
  <div
    v-if="rating"
    class="rating"
  >
    <h2 class="rating__h2">Топ 5 победителей</h2>

    <div class="table">
      <div class="table__row table__header_fill">
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
        <div class="table__item">{{ index + 1 }}</div>
        <div class="table__item">{{ item.username }}</div>
        <div class="table__item">{{ item.points }}</div>
        <div class="table__item">{{ item.time }}</div>
      </div>

      <div class="table__col">
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
import { baseURL } from '@/api/api.config'
import Api from '@/api/api'

export default {
  name: 'QuizRating',
  props: {
    quizlet_id: {
      type: Number,
      required: true
    },
    user_id: {
      type: Number,
      required: true
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
      if (!this.rating.length) return []
      const getUserIndex = this.rating.findIndex(item => item.user_id === this.user_id)

      return {
        ...this.rating[getUserIndex],
        number: (getUserIndex + 1)
      }
    }
  },
  mounted () {
    setTimeout(async () => {
      this.rating = await Api.get(`${baseURL}/user/rating/get`, {
        params: {
          quizlet_id: this.quizlet_id,
          user_id: this.user_id
        }
      }).then(res => res.data)
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.rating {
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 100%;

  &__h2 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #363636;
    text-align: left;
    margin-bottom: 16px;
  }
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 1rem;
  }

  &__row {
    display: grid;
    grid-template-columns: 8% 30% 35% 23%;
    grid-gap: 8px;
    font-size: 1rem;
    font-weight: 700;
    text-align: left;
    width: 100%;

    &_highlight {
      border-top: thin solid #4ba1ca;
      margin-top: 1rem;
    }
  }

  &__header {
    font-size: 1rem;
    font-weight: 700;
    color: #363636;
    border-bottom: 1rem;

    &_fill {
      color: #fff;
      background: #363636;
    }
  }

  &__item {
    padding: 12px 16px;
  }
}

.loader,
.loader:before,
.loader:after {
  background: #65abf8;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #65abf8;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
