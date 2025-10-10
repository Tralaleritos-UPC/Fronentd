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