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

    <!-- Right Panel - Register Form -->
    <div class="auth-right">
      <div class="auth-form-container">
        <div class="auth-header">
          <h2>Regístrate</h2>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
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
            <label for="name">Nombre de usuario</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="input"
              placeholder="Email"
              required
            />
          </div>

          <div class="form-row">
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

            <div class="form-group">
              <label for="confirmPassword">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                class="input"
                placeholder="••••••••••••••••"
                required
              />
            </div>
          </div>

          <!-- reCAPTCHA -->
          <div class="recaptcha-container">
            <div class="recaptcha-box">
              <div class="recaptcha-checkbox">
                <input 
                  id="recaptcha" 
                  v-model="form.recaptcha"
                  type="checkbox"
                />
                <label for="recaptcha">No soy un robot</label>
              </div>
              <div class="recaptcha-logo">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" alt="reCAPTCHA" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="isLoading || !isFormValid"
            >
              {{ isLoading ? 'Creando cuenta...' : 'Confirmar' }}
            </button>
            
                        <div class="auth-switch">
              <span>¿Ya tienes una cuenta?</span>
              <router-link to="/login" class="auth-link">Inicia sesión aquí</router-link>
            </div>
          </div>
        </form>

        <!-- Theme Toggle -->
        <div class="theme-toggle">
          <button @click="toggleDarkMode" class="theme-btn">
            <component :is="isDarkMode ? 'Sun' : 'Moon'" :size="20" />
          </button>
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
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Sun, Moon } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const { isDarkMode, toggleDarkMode } = inject('darkMode', { isDarkMode: ref(false), toggleDarkMode: () => {} })

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  recaptcha: false
})

const error = ref('')
const isLoading = ref(false)

const isFormValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.recaptcha
})

const handleRegister = async () => {
  if (isLoading.value || !isFormValid.value) return
  
  error.value = ''
  
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  
  isLoading.value = true
  
  const result = await authStore.register({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  })
  
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.recaptcha-container {
  margin: 1.5rem 0;
}

.recaptcha-box {
  border: 1px solid #404854;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.03);
}

.recaptcha-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.recaptcha-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.recaptcha-checkbox label {
  color: #b2bec3;
  margin: 0;
  font-size: 0.9rem;
}

.recaptcha-logo img {
  width: 32px;
  height: 32px;
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

/* Responsive */
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }
  
  .auth-left {
    min-height: 250px;
  }
  
  .auth-right {
    flex: 1;
  }
  
  .logo-section h1 {
    font-size: 32px;
  }
  
  .auth-form-container {
    max-width: 100%;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>