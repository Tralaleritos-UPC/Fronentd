<template>
  <div class="auth-container" :class="{ dark: isDarkMode }">
    <!-- Left Panel - Green Section -->
    <div class="auth-left">
      <div class="logo-section">
        <div class="logo-container">
          <div class="hand-icon">👋</div>
        </div>
        <h1>Bienvenido a SignLingo</h1>
        <p>Tus manos tienen mucho que decir.</p>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="auth-right">
      <div class="auth-form-container">
        <div class="auth-header">
          <h2>Inicio de sesión</h2>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="input"
              placeholder="Email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="input"
              placeholder="••••••••••••••••"
              required
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              {{ isLoading ? 'Iniciando sesión...' : 'Confirmar' }}
            </button>
          </div>
        </form>

        <div class="auth-switch">
          <span>¿No tienes una cuenta?</span>
          <router-link to="/register" class="auth-link">Regístrate aquí</router-link>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Sun, Moon } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const { isDarkMode, toggleDarkMode } = inject('darkMode', { isDarkMode: ref(false), toggleDarkMode: () => {} })

const form = ref({
  email: 'juan@example.com', // Pre-filled for demo
  password: '123456'
})

const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (isLoading.value) return
  
  error.value = ''
  isLoading.value = true
  
  const result = await authStore.login(form.value)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error
  }
  
  isLoading.value = false
}
</script>

<style scoped>
.auth-container {
  display: flex;
  min-height: 100vh;
}

.auth-left {
  flex: 1;
  background: linear-gradient(135deg, #011c02 0%, #45a049 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  animation: fadeInLeft 0.8s ease-out;
}

.auth-left::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: rgba(0, 150, 100, 0.3);
  border-radius: 50%;
  bottom: -200px;
  left: -100px;
}

.auth-left::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(0, 100, 70, 0.2);
  border-radius: 50%;
  top: -100px;
  right: -150px;
}

.logo-section {
  text-align: center;
  color: white;
  z-index: 1;
  position: relative;
}

.hand-icon {
  font-size: 80px;
  margin-bottom: 30px;
  animation: wave 2s infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.logo-section h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
}

.logo-section p {
  font-size: 20px;
  font-weight: 300;
  opacity: 0.95;
}

.auth-right {
  flex: 1;
  background: #0d0d0d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

/* Formas orgánicas de fondo */
.auth-right::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(ellipse 80% 70% at 40% 30%, rgba(50, 70, 80, 0.3) 0%, transparent 70%);
  border-radius: 40% 60% 65% 35% / 35% 65% 40% 60%;
  top: -100px;
  right: -150px;
  animation: float 6s ease-in-out infinite;
}

.auth-right::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(ellipse 80% 70% at 60% 70%, rgba(50, 70, 80, 0.2) 0%, transparent 70%);
  border-radius: 50% 40% 55% 45% / 45% 55% 40% 50%;
  bottom: -200px;
  left: -100px;
  animation: float-reverse 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

@keyframes float-reverse {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-30px, 30px); }
}

.auth-form-container {
  background: rgba(40, 50, 60, 0.4);
  padding: 50px;
  border-radius: 40% 60% 70% 30% / 30% 70% 40% 60%;
  width: 100%;
  max-width: 420px;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 120, 140, 0.2);
  animation: fadeInRight 0.8s ease-out;
  position: relative;
}

.auth-header h2 {
  color: white;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: #b2bec3;
  font-size: 13px;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-actions {
  margin-top: 10px;
}

.auth-switch {
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
}

.auth-switch span {
  color: #95a5a6;
}

.auth-link {
  color: #0a9d5e;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.auth-link:hover {
  color: #0db877;
  text-decoration: underline;
}

/* Animaciones */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
}

.theme-btn {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 12px 16px;
  border-radius: var(--radius);
  margin-top: 16px;
  font-size: 0.875rem;
}

/* Dark theme specific */
.dark .auth-left {
  background: linear-gradient(135deg, #0f4b0f 0%, #011a01 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }
  
  .auth-left {
    min-height: 40vh;
  }
  
  .logo-section h1 {
    font-size: 2rem;
  }
  
  .auth-form-container {
    padding: 24px;
  }
}
</style>