import { createApp } from 'vue'
<<<<<<< HEAD
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
=======
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
>>>>>>> signlingo-vue
