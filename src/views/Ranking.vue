<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="main-content">
      <div class="ranking-container">
        <!-- Header Banner -->
        <div class="ranking-banner">
          <h1>Ranking Global</h1>
          <p>Mira el ranking de estudiantes de SignLingo</p>
        </div>

        <!-- Current User Stats -->
        <div v-if="currentUser" class="user-position-card">
          <div class="user-info">
            <div class="user-avatar">
              <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Avatar" />
              <div v-else class="default-avatar">{{ currentUser.name.charAt(0) }}</div>
            </div>
            <div class="user-details">
              <h3>{{ currentUser.name }}</h3>
              <p>Posición #{{ currentUser.position }}</p>
            </div>
          </div>
          <div class="user-points">
            <div class="points-badge">
              <Star :size="20" />
              <span>{{ currentUser.points }}</span>
            </div>
          </div>
        </div>

        <!-- Ranking List -->
        <div class="ranking-list">
          <h2 class="section-title">Top Jugadores</h2>
          
          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
            <p>Cargando ranking...</p>
          </div>

          <div v-else class="ranking-items">
            <div
              v-for="user in ranking"
              :key="user.id"
              class="ranking-item"
              :class="{ 'current-user': user.isCurrentUser }"
            >
              <!-- Position -->
              <div class="position">
                <div v-if="user.position <= 3" class="medal">
                  <component 
                    :is="getMedalIcon(user.position)" 
                    :size="24"
                    :class="getMedalClass(user.position)"
                  />
                </div>
                <span v-else class="position-number">{{ user.position }}</span>
              </div>

              <!-- User Info -->
              <div class="user-info">
                <div class="user-avatar">
                  <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
                  <div v-else class="default-avatar">{{ user.name.charAt(0) }}</div>
                </div>
                <div class="user-details">
                  <h4>{{ user.name }}</h4>
                  <p v-if="user.isCurrentUser" class="current-label">Tú</p>
                </div>
              </div>

              <!-- Points -->
              <div class="points">
                <Star :size="16" />
                <span>{{ user.points.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievement Levels -->
        <div class="achievement-section">
          <h2 class="section-title">Próximos Niveles</h2>
          <div class="achievement-grid">
            <div class="achievement-item">
              <div class="achievement-icon bronze">🥉</div>
              <div class="achievement-info">
                <h4>Bronce</h4>
                <p>1,000 puntos</p>
              </div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon silver">🥈</div>
              <div class="achievement-info">
                <h4>Plata</h4>
                <p>2,500 puntos</p>
              </div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon gold">🥇</div>
              <div class="achievement-info">
                <h4>Oro</h4>
                <p>5,000 puntos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '@/services/api'
import Sidebar from '@/components/Sidebar.vue'
import { Star, Medal, Award, Trophy } from 'lucide-vue-next'

const ranking = ref([])
const isLoading = ref(true)

const currentUser = computed(() => {
  return ranking.value.find(user => user.isCurrentUser)
})

const getMedalIcon = (position) => {
  switch (position) {
    case 1: return Trophy
    case 2: return Award  
    case 3: return Medal
    default: return null
  }
}

const getMedalClass = (position) => {
  switch (position) {
    case 1: return 'gold-medal'
    case 2: return 'silver-medal'
    case 3: return 'bronze-medal'
    default: return ''
  }
}

const loadRanking = async () => {
  try {
    const response = await api.get('/ranking')
    ranking.value = response.data.ranking
  } catch (error) {
    console.error('Error loading ranking:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadRanking()
})
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
  overflow-y: auto;
  color: white;
}

.ranking-container {
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
}

.ranking-banner {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 32px;
}

.ranking-banner h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.ranking-banner p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.user-position-card {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border-radius: var(--radius);
  padding: 24px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
}

.user-position-card .user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-avatar {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.user-details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.user-details p {
  opacity: 0.9;
  margin: 0;
}

.points-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ranking-items {
  background: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #333;
  transition: background 0.3s ease;
}

.ranking-item:last-child {
  border-bottom: none;
}

.ranking-item:hover {
  background: #333;
}

.ranking-item.current-user {
  background: rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4CAF50;
}

.position {
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.medal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gold-medal {
  color: #ffd700;
}

.silver-medal {
  color: #c0c0c0;
}

.bronze-medal {
  color: #cd7f32;
}

.position-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.ranking-item .user-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ranking-item .user-avatar {
  width: 40px;
  height: 40px;
  background: var(--border);
}

.ranking-item .user-details h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
  color: white;
}

.current-label {
  font-size: 0.75rem;
  color: #4CAF50;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.points {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  font-weight: 600;
}

.achievement-section {
  margin-top: 48px;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.achievement-item {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.achievement-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--border);
}

.achievement-icon.bronze {
  background: linear-gradient(135deg, #cd7f32, #8b5a2b);
}

.achievement-icon.silver {
  background: linear-gradient(135deg, #c0c0c0, #a0a0a0);
}

.achievement-icon.gold {
  background: linear-gradient(135deg, #ffd700, #ffb300);
}

.achievement-info h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.achievement-info p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .ranking-container {
    padding: 20px 16px;
  }
  
  .ranking-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .ranking-header h1 {
    font-size: 1.5rem;
  }
  
  .user-position-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .ranking-item {
    padding: 12px 16px;
  }
  
  .achievement-grid {
    grid-template-columns: 1fr;
  }
}
</style>