import axios from 'axios'

// Mock data - API fake
const mockUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456',
    avatar: null,
    level: 5,
    points: 1250,
    streak: 7,
    subscription: 'premium'
  }
]

const mockLessons = [
  {
    id: 1,
    title: 'Introducción de Señas',
    description: 'Aprende los conceptos básicos del lenguaje de señas',
    progress: 75,
    exercises: [
      { id: 1, type: 'recognition', completed: true },
      { id: 2, type: 'practice', completed: true },
      { id: 3, type: 'quiz', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Fundamento de señas',
    description: 'Señas fundamentales para la comunicación diaria',
    progress: 45,
    exercises: [
      { id: 4, type: 'recognition', completed: true },
      { id: 5, type: 'practice', completed: false },
      { id: 6, type: 'quiz', completed: false }
    ]
  }
]

const mockExercises = [
  {
    id: 1,
    question: 'Elija el significado de la siguiente seña',
    type: 'multiple_choice',
    image: '/thumbs-up.svg',
    options: [
      { id: 'a', text: 'Cinco', correct: false },
      { id: 'b', text: 'Adiós', correct: true },
      { id: 'c', text: 'Hola', correct: false },
      { id: 'd', text: 'Está bien', correct: false }
    ]
  },
  {
    id: 2,
    question: 'Replique esta seña con su cámara',
    type: 'camera_practice',
    targetSign: 'hola',
    instruction: 'Levante su mano y mueva los dedos como saludo'
  }
]

const mockRanking = [
  { id: 1, name: 'Ana García', points: 2840, position: 1, avatar: null },
  { id: 2, name: 'Carlos López', points: 2650, position: 2, avatar: null },
  { id: 3, name: 'María Rodríguez', points: 2480, position: 3, avatar: null },
  { id: 4, name: 'Pedro Martín', points: 2350, position: 4, avatar: null },
  { id: 5, name: 'Laura Sánchez', points: 2200, position: 5, avatar: null },
  { id: 6, name: 'Juan Pérez', points: 1250, position: 6, avatar: null, isCurrentUser: true }
]

// Simulate API delays
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API responses
const mockAPI = {
  async post(url, data) {
    await delay()
    
    switch (url) {
      case '/auth/login':
        const user = mockUsers.find(u => 
          u.email === data.email && u.password === data.password
        )
        if (user) {
          const { password, ...userData } = user
          return {
            data: {
              user: userData,
              token: 'mock-jwt-token-' + user.id
            }
          }
        }
        throw { response: { data: { message: 'Credenciales incorrectas' } } }
      
      case '/auth/register':
        // Simulate user creation
        const newUser = {
          id: mockUsers.length + 1,
          name: data.name,
          email: data.email,
          avatar: null,
          level: 1,
          points: 0,
          streak: 0,
          subscription: 'free'
        }
        mockUsers.push({ ...newUser, password: data.password })
        return {
          data: {
            user: newUser,
            token: 'mock-jwt-token-' + newUser.id
          }
        }
      
      case '/exercises/submit':
        return {
          data: {
            correct: Math.random() > 0.3, // 70% chance of correct answer
            points: data.correct ? 10 : 0,
            explanation: 'Respuesta procesada'
          }
        }
      
      default:
        throw { response: { data: { message: 'Endpoint no encontrado' } } }
    }
  },

  async get(url) {
    await delay()
    
    switch (url) {
      case '/auth/me':
        return {
          data: {
            user: mockUsers[0] // Return first user for demo
          }
        }
      
      case '/lessons':
        return {
          data: {
            lessons: mockLessons
          }
        }
      
      case '/ranking':
        return {
          data: {
            ranking: mockRanking
          }
        }
      
      case '/exercises/1':
      case '/exercises/2':
        const exerciseId = parseInt(url.split('/')[2])
        return {
          data: {
            exercise: mockExercises.find(e => e.id === exerciseId) || mockExercises[0]
          }
        }
      
      default:
        throw { response: { data: { message: 'Endpoint no encontrado' } } }
    }
  }
}

// Create axios instance
export const api = axios.create({
  baseURL: 'https://api.signlingo.com', // This won't be used in mock mode
})

// Intercept requests and use mock data instead
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Override axios methods to use mock API
api.post = mockAPI.post
api.get = mockAPI.get

export default api