<template>
  <div class="flex flex-row h-screen w-full">
    <div class="flex flex-col items-center justify-end h-full w-1/2 bg-transparent px-10">
      <div class="flex flex-col items-center w-full my-auto relative top-14">
        <h2 class="text-6xl font-bold text-black mb-2">SQA DAYS <span class="text-primary">/</span> 30</h2>
        <p class="text-lg font-regular text-black text-center">Двенадцатая международная конференция по системному и бизнес анализу</p>
      </div>

      <img
        :src="LearningIcon"
        alt="learning"
        class=""
      >
    </div>

    <div class="flex flex-col justify-center items-center h-full w-1/2 bg-white">
      <div class="flex flex-col w-328 shadow-md-y-0 px-5 py-6 bg-white rounded-2xl">
        <h2 class="text-xl font-normal text-black mb-6">Авторизация</h2>

        <form class="flex flex-col">
          <div class="flex flex-col w-full mb-4">
            <label class="text-sm text-black font-normal mb-1 ml-2">имя</label>
            <input type="text" class="input">
          </div>

          <div class="flex flex-col w-full mb-8">
            <label class="text-sm text-black font-normal mb-1 ml-2">код</label>
            <input type="text" class="input">
          </div>

          <Button
            classes="button_primary"
            value="войти"
            @on-click="login"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import LearningIcon from '@/assets/svg/learning.svg'

export default {
  name: 'Auth',
  components: {
    Button
  },
  data () {
    return {
      LearningIcon
    }
  },
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>
