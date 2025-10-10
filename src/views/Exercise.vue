<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="main-content">
      <div class="exercise-container">
        <!-- Exercise Header -->
        <div class="exercise-header">
          <router-link to="/dashboard" class="back-btn">
            <X :size="24" />
          </router-link>
          
          <div class="exercise-info">
            <div class="lesson-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 60%"></div>
              </div>
              <span class="lesson-name">Abecedario 1</span>
            </div>
            <div class="exercise-number">Ejercicio 1 de 5</div>
          </div>
          
          <div class="exercise-lives">
            <Heart class="heart-icon filled" />
            <span>5/5</span>
          </div>
        </div>

        <!-- Exercise Content -->
        <div v-if="currentExercise" class="exercise-content">
          <!-- Question -->
          <div class="question-section">
            <h2 class="question-title">{{ currentExercise.question }}</h2>
            
            <!-- Exercise Image/Video -->
            <div class="media-container">
              <div v-if="currentExercise.type === 'multiple_choice'" class="sign-image">
                <img :src="currentExercise.image" alt="Seña" />
              </div>
              
              <div v-else-if="currentExercise.type === 'camera_practice'" class="camera-section">
                <div class="camera-container">
                  <video ref="videoElement" autoplay muted class="camera-feed"></video>
                  <div v-if="!cameraActive" class="camera-placeholder">
                    <Camera :size="48" />
                    <p>Permitir acceso a la cámara</p>
                  </div>
                </div>
                
                <div class="instruction">
                  <p>{{ currentExercise.instruction }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Answer Options (Multiple Choice) -->
          <div v-if="currentExercise.type === 'multiple_choice'" class="options-section">
            <div class="options-grid">
              <button
                v-for="option in currentExercise.options"
                :key="option.id"
                class="option-btn"
                :class="{ 
                  selected: selectedOption === option.id,
                  correct: showResult && option.correct,
                  incorrect: showResult && selectedOption === option.id && !option.correct
                }"
                @click="selectOption(option.id)"
                :disabled="showResult"
              >
                {{ option.text }}
              </button>
            </div>
          </div>

          <!-- Camera Practice Controls -->
          <div v-else-if="currentExercise.type === 'camera_practice'" class="camera-controls">
            <button 
              v-if="!cameraActive"
              @click="startCamera" 
              class="btn btn-primary"
            >
              Activar Cámara
            </button>
            
            <div v-else class="practice-controls">
              <button 
                @click="startRecording" 
                class="btn btn-secondary"
                :disabled="isRecording"
              >
                {{ isRecording ? 'Grabando...' : 'Comenzar Práctica' }}
              </button>
              
              <button 
                v-if="isRecording"
                @click="stopRecording" 
                class="btn btn-primary"
              >
                Detener
              </button>
            </div>
          </div>

          <!-- Action Button -->
          <div class="action-section">
            <button
              v-if="currentExercise.type === 'multiple_choice'"
              @click="submitAnswer"
              class="btn btn-primary confirm-btn"
              :disabled="!selectedOption || showResult"
            >
              {{ showResult ? 'Continuar' : 'Confirmar' }}
            </button>
            
            <button
              v-else-if="currentExercise.type === 'camera_practice' && hasRecording"
              @click="submitRecording"
              class="btn btn-primary confirm-btn"
            >
              Enviar Práctica
            </button>
          </div>

          <!-- Result Feedback -->
          <div v-if="showResult" class="result-section">
            <div class="result-card" :class="{ correct: lastResult.correct, incorrect: !lastResult.correct }">
              <div class="result-icon">
                <CheckCircle v-if="lastResult.correct" :size="32" />
                <XCircle v-else :size="32" />
              </div>
              <div class="result-text">
                <h3>{{ lastResult.correct ? '¡Correcto!' : '¡Incorrecto!' }}</h3>
                <p v-if="lastResult.explanation">{{ lastResult.explanation }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="loading">
          <div class="spinner"></div>
          <p>Cargando ejercicio...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/services/api'
import Sidebar from '@/components/Sidebar.vue'
import { 
  ArrowLeft, 
  Heart, 
  Camera, 
  CheckCircle, 
  XCircle,
  X
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const currentExercise = ref(null)
const selectedOption = ref(null)
const showResult = ref(false)
const lastResult = ref({})
const lives = ref(3)
const cameraActive = ref(false)
const isRecording = ref(false)
const hasRecording = ref(false)
const videoElement = ref(null)

let mediaStream = null

const loadExercise = async () => {
  try {
    const exerciseId = route.params.id || 1
    const response = await api.get(`/exercises/${exerciseId}`)
    currentExercise.value = response.data.exercise
    
    // Reset state
    selectedOption.value = null
    showResult.value = false
    lastResult.value = {}
  } catch (error) {
    console.error('Error loading exercise:', error)
    router.push('/dashboard')
  }
}

const selectOption = (optionId) => {
  if (showResult.value) return
  selectedOption.value = optionId
}

const submitAnswer = async () => {
  if (!selectedOption.value || showResult.value) return
  
  try {
    const response = await api.post('/exercises/submit', {
      exerciseId: currentExercise.value.id,
      answer: selectedOption.value,
      correct: currentExercise.value.options.find(o => o.id === selectedOption.value)?.correct
    })
    
    lastResult.value = response.data
    showResult.value = true
    
    if (!response.data.correct) {
      lives.value = Math.max(0, lives.value - 1)
    }
    
    // Auto continue after 2 seconds
    setTimeout(() => {
      if (lives.value > 0) {
        nextExercise()
      } else {
        router.push('/dashboard')
      }
    }, 2000)
  } catch (error) {
    console.error('Error submitting answer:', error)
  }
}

const startCamera = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: false 
    })
    
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream
      cameraActive.value = true
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    alert('No se pudo acceder a la cámara. Por favor, permite el acceso para continuar.')
  }
}

const startRecording = () => {
  isRecording.value = true
  // Simulate recording for 3 seconds
  setTimeout(() => {
    if (isRecording.value) {
      stopRecording()
    }
  }, 3000)
}

const stopRecording = () => {
  isRecording.value = false
  hasRecording.value = true
}

const submitRecording = async () => {
  try {
    const response = await api.post('/exercises/submit', {
      exerciseId: currentExercise.value.id,
      type: 'camera_practice',
      correct: Math.random() > 0.3 // 70% success rate for demo
    })
    
    lastResult.value = response.data
    showResult.value = true
    
    if (!response.data.correct) {
      lives.value = Math.max(0, lives.value - 1)
    }
    
    // Auto continue after 2 seconds
    setTimeout(() => {
      if (lives.value > 0) {
        nextExercise()
      } else {
        router.push('/dashboard')
      }
    }, 2000)
  } catch (error) {
    console.error('Error submitting recording:', error)
  }
}

const nextExercise = () => {
  const nextId = parseInt(route.params.id || 1) + 1
  router.push(`/exercise/${nextId}`)
}

const cleanup = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop())
    mediaStream = null
  }
}

onMounted(() => {
  loadExercise()
})

onUnmounted(() => {
  cleanup()
})

// Watch for route changes to load new exercises
watch(() => route.params.id, () => {
  if (route.name === 'Exercise') {
    loadExercise()
  }
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

.exercise-container {
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 16px 0;
}

.back-btn {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #ccc;
}

.exercise-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.lesson-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #333;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

.lesson-name {
  color: #4CAF50;
  font-weight: 600;
  font-size: 0.9rem;
}

.exercise-number {
  color: #999;
  font-size: 0.9rem;
}

.exercise-lives {
  display: flex;
  align-items: center;
  gap: 8px;
}

.heart-icon {
  color: #ff6b6b;
}

.exercise-lives span {
  color: #ff6b6b;
  font-weight: 600;
}

.exercise-content {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #333;
}

.question-section {
  text-align: center;
  margin-bottom: 32px;
}

.question-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 24px;
}

.media-container {
  margin-bottom: 32px;
}

.sign-image img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 20px;
  background: white;
  padding: 20px;
}

.camera-section {
  max-width: 400px;
  margin: 0 auto;
}

.camera-container {
  position: relative;
  width: 100%;
  height: 300px;
  background: #000;
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 16px;
}

.camera-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.camera-placeholder p {
  margin-top: 8px;
  font-size: 0.875rem;
}

.instruction {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
}

.options-section {
  margin-bottom: 32px;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.option-btn {
  padding: 16px 24px;
  border: 2px solid #444;
  border-radius: 8px;
  background: #333;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-btn:hover {
  border-color: #4CAF50;
  background: #3a3a3a;
}

.option-btn.selected {
  border-color: #4CAF50;
  background: #4CAF50;
  color: white;
}

.option-btn.correct {
  border-color: #4caf50;
  background: #4caf50;
  color: white;
}

.option-btn.incorrect {
  border-color: #f44336;
  background: #f44336;
  color: white;
}

.option-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.camera-controls {
  text-align: center;
  margin-bottom: 32px;
}

.practice-controls {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.action-section {
  text-align: center;
}

.confirm-btn {
  padding: 16px 48px;
  font-size: 1.125rem;
  font-weight: 600;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.result-section {
  margin-top: 24px;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius);
  border-left: 4px solid;
}

.result-card.correct {
  background: #e8f5e8;
  border-left-color: #4caf50;
  color: #2e7d32;
}

.result-card.incorrect {
  background: #ffebee;
  border-left-color: #f44336;
  color: #c62828;
}

.result-icon {
  flex-shrink: 0;
}

.result-text h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.result-text p {
  margin: 0;
  opacity: 0.8;
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

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .exercise-container {
    padding: 20px 16px;
  }
  
  .exercise-content {
    padding: 24px 20px;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .practice-controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>