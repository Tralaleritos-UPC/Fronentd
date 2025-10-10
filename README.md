# SignLingo - Aplicación de Aprendizaje de Lenguaje de Señas

Una aplicación completa desarrollada en Vue 3 que replica exactamente el diseño de Figma para SignLingo, una plataforma de aprendizaje de lenguaje de señas.

## 🚀 Características

### ✅ Pantallas Implementadas
- **Login** - Inicio de sesión con tema claro/oscuro
- **Register** - Registro con validación y reCAPTCHA
- **Dashboard** - Panel principal con lecciones y progreso
- **Exercise** - Ejercicios interactivos (múltiple opción y práctica con cámara)
- **Ranking** - Sistema de clasificación global
- **Profile** - Perfil de usuario con estadísticas
- **Subscriptions** - Gestión de planes y suscripciones

### 🎨 Diseño
- ✅ Replica exactamente el diseño de Figma
- ✅ Modo claro y oscuro
- ✅ Completamente responsive
- ✅ Animaciones suaves
- ✅ Iconos con Lucide Vue

### 🔧 Tecnologías
- **Vue 3** con Composition API
- **Vue Router** para navegación
- **Pinia** para gestión de estado
- **Vite** como bundler
- **API Fake** con datos simulados
- **CSS modular** con variables personalizadas

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Agregar logo.png:**
   - Coloca tu archivo `logo.png` en la carpeta `public/`

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🎯 Funcionalidades

### Autenticación
- Login con credenciales demo: `juan@example.com` / `123456`
- Registro de nuevos usuarios
- Persistencia de sesión
- Navegación protegida

### Dashboard
- Vista de lecciones disponibles
- Progreso por lección
- Estadísticas del usuario (nivel, puntos, racha)
- Acceso rápido a secciones

### Ejercicios
- **Reconocimiento de señas**: Preguntas de múltiple opción
- **Práctica con cámara**: Grabación y evaluación de señas
- Sistema de vidas (3 intentos)
- Feedback inmediato
- Progresión automática

### Ranking
- Clasificación global de usuarios
- Posición del usuario actual destacada
- Sistema de medallas (oro, plata, bronce)
- Niveles de logros

### Perfil
- Información personal del usuario
- Estadísticas detalladas
- Edición de datos
- Avatar personalizable

### Suscripciones
- Planes: Gratuito, Premium, Profesional
- Métodos de pago
- Historial de facturación
- Gestión de suscripción

## 🎨 Temas

La aplicación incluye soporte completo para temas claro y oscuro:

- **Tema Claro**: Colores brillantes, fondo blanco
- **Tema Oscuro**: Colores oscuros, mejor para poca luz
- **Toggle**: Botón en login/register para alternar temas
- **Persistencia**: El tema se guarda en localStorage

## 📱 Responsive Design

- **Desktop**: Layout completo con sidebar
- **Tablet**: Adaptación de componentes
- **Mobile**: Sidebar colapsado, navegación optimizada

## 🔄 API Fake

La aplicación usa una API simulada con datos realistas:

```javascript
// Usuarios de ejemplo
const mockUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456',
    level: 5,
    points: 1250,
    streak: 7
  }
]
```

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── Sidebar.vue     # Navegación lateral
├── views/              # Páginas principales
│   ├── Login.vue       # Inicio de sesión
│   ├── Register.vue    # Registro
│   ├── Dashboard.vue   # Panel principal
│   ├── Exercise.vue    # Ejercicios
│   ├── Ranking.vue     # Clasificación
│   ├── Profile.vue     # Perfil
│   └── Subscriptions.vue # Suscripciones
├── stores/             # Gestión de estado (Pinia)
│   └── auth.js         # Store de autenticación
├── services/           # Servicios API
│   └── api.js          # API fake con mock data
├── router/             # Configuración de rutas
│   └── index.js        # Rutas y guards
├── style.css           # Estilos globales
└── main.js             # Punto de entrada
```

## 🎨 Sistema de Colores

```css
:root {
  --primary: #4CAF50;      /* Verde principal */
  --primary-dark: #45a049;  /* Verde oscuro */
  --secondary: #2196F3;     /* Azul secundario */
  --dark-bg: #1a1a1a;      /* Fondo oscuro */
  --dark-card: #2d2d2d;    /* Tarjetas oscuras */
  --text-primary: #333333;  /* Texto principal */
  --text-secondary: #666666; /* Texto secundario */
}
```

## 🔧 Configuración

### Cambiar Puerto
```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Variables de Entorno
```bash
# .env
VITE_API_URL=https://api.signlingo.com
```

## 📋 Credenciales de Prueba

**Usuario Demo:**
- Email: `juan@example.com`
- Contraseña: `123456`

## 🚀 Próximas Mejoras

- [ ] Integración con API real
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Análisis avanzado de progreso
- [ ] Integración con cámara real para ML
- [ ] Traducción i18n
- [ ] PWA support

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork del repositorio
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ usando Vue 3 y siguiendo el diseño exacto de Figma**