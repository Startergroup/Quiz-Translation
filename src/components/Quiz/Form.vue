<template>
  <div class="introduction__col">
    <form
      v-if="copyOfUser"
      class="introduction__form"
    >
      <input
        v-model="copyOfUser.username"
        type="text"
        :class="[
          'introduction__input',
          { 'introduction__input_error' : isError }
        ]"
        placeholder="Введите ваше имя"
      >

      <button
        class="introduction__button button button_primary"
        @click.prevent="handleClick"
      >
        Участвую!
      </button>
    </form>
    <span class="introduction__agreement">Нажимая "Участвовать" я даю согласие на передачу контактных данных спонсору квиза для передачи приза в случае победы</span>
  </div>
</template>

<script>
import { baseURL } from '@/api/api.config'
import Api from '@/api/api'

export default {
  name: 'QuizForm',
  props: {
    startQuizlet: {
      type: Function,
      required: true
    },
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      copyOfUser: null,
      isError: false
    }
  },
  methods: {
    setUsername () {
      localStorage.setItem('werialUsername', this.copyOfUser.username)
    },
    async handleClick () {
      const isFilledUsername = Boolean(this.copyOfUser.username)

      if (isFilledUsername) {
        this.isError = false
        this.setUsername()
        await Api.post(`${baseURL}/user/create`, {
          data: {
            username: this.copyOfUser.username,
            _key: this.copyOfUser._key
          }
        })
        this.$emit('updateUser', this.copyOfUser)
        this.startQuizlet()
      } else {
        this.isError = true
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      handler: function () {
        this.copyOfUser = JSON.parse(JSON.stringify(this.user))
      }
    }
  }
}
</script>

<style lang="scss">
.introduction {
  &__col {
    display: flex;
    flex-direction: column;
  }

  &__agreement {
    font-size: .75rem;
    font-weight: 500;
    color: #363636;
    margin-top: 1rem;
  }

  &__logo {
    margin-bottom: 2rem;
  }
}
</style>
