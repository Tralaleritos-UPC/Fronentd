<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="main-content">
      <div class="profile-container">
        <!-- User Profile Header -->
        <div class="profile-header">
          <div class="user-info">
            <div class="avatar-container">
              <img src="https://i.pravatar.cc/80?img=12" alt="Marcelo Fabian Garro Vaga" />
            </div>
            <div class="user-details">
              <h2>Marcelo Fabian Garro Vaga</h2>
              <p>marcelofgarrov123@gmail.com</p>
              <p class="member-since">Se unió en Mayo 2018</p>
              
              <div class="user-badges">
                <span class="badge premium">Premium</span>
                <span class="badge certified">Certificado</span>
              </div>
            </div>
          </div>
          
          <div class="edit-profile-btn">
            <Edit3 :size="16" />
          </div>
        </div>

        <!-- Stats Section -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-number">48</div>
            <div class="stat-label">Niveles completados</div>
          </div>
          
          <div class="stat-card">
            <div class="star-icon">
              <Star :size="48" />
            </div>
            <div class="stat-label">Experiencia extendida</div>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="settings-section">
          <div class="settings-header">
            <Settings :size="20" />
            <span>Preferencias</span>
          </div>
          <p class="settings-subtitle">Controla la funcionalidad de la aplicación</p>

          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">Idioma</span>
              </div>
              <div class="setting-control">
                <select class="setting-select">
                  <option>Español</option>
                  <option>English</option>
                  <option>Português</option>
                </select>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">Lecciones con cámara</span>
              </div>
              <div class="setting-control">
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">Modo Oscuro</span>
              </div>
              <div class="setting-control">
                <label class="toggle-switch">
                  <input type="checkbox">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">Efectos de sonido</span>
              </div>
              <div class="setting-control">
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">Notificaciones</span>
              </div>
              <div class="setting-control">
                <label class="toggle-switch">
                  <input type="checkbox" checked>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/Sidebar.vue'
import { Edit3, Star, Settings } from 'lucide-vue-next'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  background: #1a1a1a;
  padding: 32px;
  color: white;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

/* Profile Header */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #333;
  position: relative;
}

.user-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: white;
}

.user-details p {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 2px;
}

.member-since {
  font-size: 0.8rem !important;
  color: #666 !important;
}

.user-badges {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.premium {
  background: #4CAF50;
  color: white;
}

.badge.certified {
  background: #666;
  color: white;
}

.edit-profile-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.edit-profile-btn:hover {
  background: #444;
}

/* Stats Section */
.stats-section {
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #333;
  flex: 1;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #999;
}

.star-icon {
  color: #FFD700;
  margin-bottom: 8px;
}

/* Settings Section */
.settings-section {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #333;
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.settings-header span {
  font-weight: 600;
  font-size: 1.1rem;
}

.settings-subtitle {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.setting-label {
  color: white;
  font-size: 0.95rem;
}

.setting-select {
  background: #333;
  border: 1px solid #444;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.setting-select:focus {
  outline: none;
  border-color: #4CAF50;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
  transition: 0.3s;
  border-radius: 28px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 20px 16px;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
  
  .stats-section {
    flex-direction: column;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>