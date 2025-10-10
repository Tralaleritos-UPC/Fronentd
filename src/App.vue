<<<<<<< HEAD
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      <h1>Hola Musdsndo!</h1>
    </a>
  </div>
  <HelloWorld msg="Vite + Hola" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
=======
<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const isDarkMode = ref(false)
const authStore = useAuthStore()

onMounted(async () => {
  // Load user data if token exists
  if (authStore.token) {
    await authStore.loadUser()
  }
  
  // Check for saved dark mode preference
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme) {
    isDarkMode.value = JSON.parse(savedTheme)
  }
})

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}

// Provide dark mode to child components
provide('darkMode', {
  isDarkMode,
  toggleDarkMode
})
</script>

<style>
#app {
  min-height: 100vh;
  transition: all 0.3s ease;
}
</style>
>>>>>>> signlingo-vue
