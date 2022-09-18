import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { firebaseConfig } from './firebase.config'
import { initializeApp } from 'firebase/app'

import { createI18n } from 'vue-i18n'
import { messages } from './localization'

import './styles/main.scss'

const i18n = createI18n({
  locale: 'ru',
  messages
})
const app = createApp(App)

initializeApp(firebaseConfig)

app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
