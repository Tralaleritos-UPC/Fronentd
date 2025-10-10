<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="logo-container">
        <img src="/logo.png" alt="SignLingo" class="logo" />
        <span v-if="!isCollapsed" class="logo-text">SignLingo</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.name === item.name }"
      >
        <component :is="item.icon" :size="20" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Bottom Section -->
    <div class="sidebar-bottom">
      <!-- Settings -->
      <button class="nav-item" @click="$emit('toggle-settings')">
        <Settings :size="20" />
        <span v-if="!isCollapsed">Configuraciones</span>
      </button>

      <!-- Logout -->
      <button class="nav-item logout" @click="handleLogout">
        <LogOut :size="20" />
        <span v-if="!isCollapsed">Cerrar sesión</span>
      </button>
    </div>

    <!-- Collapse Toggle -->
    <button class="collapse-btn" @click="toggleCollapse">
      <ChevronLeft :class="{ rotated: isCollapsed }" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Home,
  BookOpen,
  Trophy,
  User,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isCollapsed = ref(false)

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', label: 'Inicio', icon: Home },
  { name: 'Exercise', path: '/exercise', label: 'Frases', icon: BookOpen },
  { name: 'Ranking', path: '/ranking', label: 'Ranking Global', icon: Trophy },
  { name: 'Profile', path: '/profile', label: 'Perfil', icon: User },
  { name: 'Subscriptions', path: '/subscriptions', label: 'Suscripciones', icon: CreditCard }
]

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #1a1a1a;
  color: white;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #333;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid #333;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.logo-text {
  font-weight: 700;
  font-size: 1.25rem;
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .logo-text {
  opacity: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 24px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: #4CAF50;
  color: white;
  position: relative;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: white;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px;
}

.sidebar.collapsed .nav-item span {
  display: none;
}

.sidebar-bottom {
  border-top: 1px solid #333;
  padding: 16px 0;
}

.logout {
  color: #ff6b6b !important;
}

.logout:hover {
  background: rgba(255, 107, 107, 0.1) !important;
}

.collapse-btn {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.collapse-btn:hover {
  background: #45a049;
  transform: translateY(-50%) scale(1.1);
}

.collapse-btn svg {
  transition: transform 0.3s ease;
}

.collapse-btn .rotated {
  transform: rotate(180deg);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .sidebar.collapsed {
    width: 100%;
  }
  
  .collapse-btn {
    display: none;
  }
}
</style>