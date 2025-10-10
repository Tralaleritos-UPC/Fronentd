<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="main-content">
      <div class="dashboard-container">
        <!-- Header -->
        <div class="dashboard-header">
          <h1>¡Hola, {{ user?.name || 'Usuario' }}!</h1>
          <div class="user-stats">
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-info">
                <span class="stat-value">{{ user?.streak || 0 }}</span>
                <span class="stat-label">Días</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-info">
                <span class="stat-value">{{ user?.points || 0 }}</span>
                <span class="stat-label">Puntos</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lessons Section -->
        <div class="lessons-section">
          <div v-if="isLoading" class="loading">
            <div class="spinner"></div>
            <p>Cargando lecciones...</p>
          </div>

          <div v-else class="lessons-container">
            <!-- Lesson 1 -->
            <div class="lesson-unit">
              <div class="lesson-header-badge">
                <span>Unidad 1</span>
                <span class="lesson-title">Introducción de Señas</span>
              </div>
              
              <div class="lesson-path">
                <div class="lesson-node active">
                  <div class="node-icon">
                    <BookOpen :size="24" />
                  </div>
                  <div class="node-label">Introducción</div>
                </div>
                
                <div class="lesson-connector"></div>
                
                <div class="lesson-node">
                  <div class="node-icon">
                    <span class="node-text">Abc</span>
                  </div>
                  <div class="node-label">Abecedario 1</div>
                </div>
                
                <div class="lesson-connector"></div>
                
                <div class="lesson-node">
                  <div class="node-icon">
                    <span class="node-text">13</span>
                  </div>
                  <div class="node-label">Números 1</div>
                </div>
              </div>
            </div>

            <!-- Lesson 2 -->
            <div class="lesson-unit">
              <div class="lesson-header-badge">
                <span>Unidad 2</span>
                <span class="lesson-title">Fundamento de señas</span>
              </div>
            </div>
          </div>

          <!-- Right Panel - Short Lessons -->
          <div class="short-lessons-panel">
            <div class="panel-header">
              <Star :size="16" />
              <span>300</span>
              <Heart :size="16" />
              <span>5/5</span>
            </div>
            
            <h3>Misiones diarias</h3>
            
            <div class="mission-list">
              <div class="mission-item completed">
                <div class="mission-icon">
                  <Check :size="16" />
                </div>
                <div class="mission-text">
                  <span>Entrada Saludo 1</span>
                  <small>Completa 3 ejercicios</small>
                </div>
                <span class="mission-status">Hecho</span>
              </div>
              
              <div class="mission-item completed">
                <div class="mission-icon">
                  <Check :size="16" />
                </div>
                <div class="mission-text">
                  <span>Entrada Saludo 2</span>
                  <small>Completa 3 ejercicios</small>
                </div>
                <span class="mission-status">Hecho</span>
              </div>
              
              <div class="mission-item">
                <div class="mission-icon">
                  <Check :size="16" />
                </div>
                <div class="mission-text">
                  <span>Entrada Saludo 3</span>
                  <small>Completa 3 ejercicios</small>
                </div>
                <span class="mission-status">Hecho</span>
              </div>
              
              <div class="mission-item">
                <div class="mission-icon">
                  <Check :size="16" />
                </div>
                <div class="mission-text">
                  <span>Entrada Saludo 4</span>
                  <small>Completa 3 ejercicios</small>
                </div>
                <div class="mission-checkmark">✓</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2 class="section-title">Acceso rápido</h2>
          <div class="actions-grid">
            <router-link to="/ranking" class="action-card">
              <Trophy :size="24" />
              <span>Ranking Global</span>
            </router-link>
            
            <router-link to="/profile" class="action-card">
              <User :size="24" />
              <span>Mi Perfil</span>
            </router-link>
            
            <router-link to="/subscriptions" class="action-card">
              <CreditCard :size="24" />
              <span>Suscripción</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import Sidebar from '@/components/Sidebar.vue'
import { 
  Trophy, 
  User, 
  CreditCard, 
  Eye, 
  Mic, 
  CheckCircle,
  BookOpen,
  Star,
  Heart,
  Check
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const lessons = ref([])
const isLoading = ref(true)

const user = computed(() => authStore.user)

const getExerciseIcon = (type) => {
  switch (type) {
    case 'recognition': return Eye
    case 'practice': return Mic
    case 'quiz': return CheckCircle
    default: return CheckCircle
  }
}

const loadLessons = async () => {
  try {
    const response = await api.get('/lessons')
    lessons.value = response.data.lessons
  } catch (error) {
    console.error('Error loading lessons:', error)
  } finally {
    isLoading.value = false
  }
}

const startLesson = (lesson) => {
  // Navigate to the first incomplete exercise
  const nextExercise = lesson.exercises.find(e => !e.completed)
  const exerciseId = nextExercise ? nextExercise.id : lesson.exercises[0].id
  router.push(`/exercise/${exerciseId}`)
}

onMounted(() => {
  loadLessons()
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

.dashboard-container {
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.user-stats {
  display: flex;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 16px 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.lessons-section {
  margin-bottom: 48px;
  display: flex;
  gap: 32px;
}

.lessons-container {
  flex: 1;
}

.lesson-unit {
  margin-bottom: 48px;
}

.lesson-header-badge {
  background: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: inline-block;
}

.lesson-header-badge span:first-child {
  font-size: 0.9rem;
  display: block;
}

.lesson-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.lesson-path {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.lesson-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.lesson-node.active .node-icon {
  background: #4CAF50;
  color: white;
}

.node-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.node-icon:hover {
  transform: scale(1.05);
}

.node-text {
  font-weight: 700;
  font-size: 1.2rem;
}

.node-label {
  color: #ccc;
  font-size: 0.9rem;
  text-align: center;
}

.lesson-connector {
  width: 4px;
  height: 32px;
  background: #333;
  border-radius: 2px;
}

.short-lessons-panel {
  width: 300px;
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  height: fit-content;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: flex-end;
}

.panel-header span {
  font-weight: 600;
}

.short-lessons-panel h3 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: white;
}

.mission-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mission-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #333;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.mission-item:hover {
  background: #3a3a3a;
}

.mission-item.completed {
  opacity: 0.7;
}

.mission-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mission-text {
  flex: 1;
}

.mission-text span {
  display: block;
  font-size: 0.9rem;
  color: white;
}

.mission-text small {
  color: #999;
  font-size: 0.8rem;
}

.mission-status {
  font-size: 0.8rem;
  color: #4CAF50;
  font-weight: 500;
}

.mission-checkmark {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
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

.lessons-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.lesson-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.lesson-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-color: var(--primary);
}

.lesson-header {
  margin-bottom: 16px;
}

.lesson-number {
  font-size: 0.875rem;
  color: var(--primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lesson-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 4px;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.lesson-description {
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

.exercises-preview {
  margin-bottom: 20px;
}

.exercise-items {
  display: flex;
  gap: 8px;
}

.exercise-item {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.exercise-item.completed {
  background: var(--primary);
  color: white;
}

.lesson-btn {
  width: 100%;
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.lesson-btn:hover {
  background: var(--primary-dark);
}

.quick-actions {
  margin-bottom: 32px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  color: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .dashboard-container {
    padding: 20px 16px;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .dashboard-header h1 {
    font-size: 1.5rem;
  }
  
  .user-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .lessons-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>