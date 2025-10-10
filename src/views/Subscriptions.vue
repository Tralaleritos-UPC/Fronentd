<template>
  <div class="app-layout">
    <Sidebar />
    
    <div class="main-content">
      <div class="subscriptions-container">
        <!-- Premium Benefits Banner -->
        <div class="premium-banner">
          <div class="premium-header">
            <Diamond :size="24" />
            <span>Gracias por ser premium</span>
          </div>
          <div class="next-payment">
            Tu siguiente pago será el 24/06/25
          </div>
          
          <!-- Payment Info -->
          <div class="payment-info">
            <CreditCard :size="20" />
            <div class="payment-details">
              <div class="payment-line">
                <span class="label">Fecha:</span>
                <span class="value">24/06/25</span>
              </div>
              <div class="payment-line">
                <span class="label">Monto:</span>
                <span class="value">$5</span>
              </div>
              <div class="payment-line">
                <span class="label">Tarjeta:</span>
                <span class="value">**** 2345</span>
              </div>
              <div class="payment-line">
                <span class="label">Cambiar método de pago</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div class="history-section">
          <div class="history-header">
            <Clock :size="20" />
            <span>Historial de Pagos</span>
          </div>

          <div class="history-list">
            <div class="history-item">
              <div class="payment-card">
                <CreditCard :size="16" />
              </div>
              <div class="payment-info-history">
                <div class="payment-line">
                  <span class="label">Fecha:</span>
                  <span class="value">24/05/25</span>
                </div>
                <div class="payment-line">
                  <span class="label">Monto:</span>
                  <span class="value">$5</span>
                </div>
                <div class="payment-line">
                  <span class="label">Tarjeta:</span>
                  <span class="value">**** 2345</span>
                </div>
                <div class="payment-line">
                  <span class="label">Id:</span>
                  <span class="value">78iFsSc4</span>
                </div>
              </div>
            </div>

            <div class="history-item">
              <div class="payment-card">
                <CreditCard :size="16" />
              </div>
              <div class="payment-info-history">
                <div class="payment-line">
                  <span class="label">Fecha:</span>
                  <span class="value">24/05/25</span>
                </div>
                <div class="payment-line">
                  <span class="label">Monto:</span>
                  <span class="value">$5</span>
                </div>
                <div class="payment-line">
                  <span class="label">Tarjeta:</span>
                  <span class="value">**** 2345</span>
                </div>
                <div class="payment-line">
                  <span class="label">Id:</span>
                  <span class="value">78iFsSc4</span>
                </div>
              </div>
            </div>

            <div class="history-item">
              <div class="payment-card">
                <CreditCard :size="16" />
              </div>
              <div class="payment-info-history">
                <div class="payment-line">
                  <span class="label">Fecha:</span>
                  <span class="value">24/05/25</span>
                </div>
                <div class="payment-line">
                  <span class="label">Monto:</span>
                  <span class="value">$5</span>
                </div>
                <div class="payment-line">
                  <span class="label">Tarjeta:</span>
                  <span class="value">**** 2345</span>
                </div>
                <div class="payment-line">
                  <span class="label">Id:</span>
                  <span class="value">78iFsSc4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upgrade Section (Alternative View) -->
        <div v-if="showUpgradeView" class="upgrade-section">
          <div class="upgrade-header">
            <Diamond :size="24" />
            <span>Ventajas Premium</span>
          </div>
          
          <div class="benefits-grid">
            <div class="benefit-item">
              <Heart class="benefit-icon" />
              <div class="benefit-text">
                <h4>Vidas infinitas</h4>
              </div>
            </div>
            
            <div class="benefit-item">
              <Zap class="benefit-icon" />
              <div class="benefit-text">
                <h4>Sin Anuncios</h4>
              </div>
            </div>
            
            <div class="benefit-item">
              <BookOpen class="benefit-icon" />
              <div class="benefit-text">
                <h4>Aprende más rápido</h4>
              </div>
            </div>
            
            <div class="benefit-item">
              <Users class="benefit-icon" />
              <div class="benefit-text">
                <h4>Apoyanos a mejorar</h4>
              </div>
            </div>
          </div>
          
          <button class="btn btn-primary upgrade-btn">
            Convertirse Premium por S/.9.99
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { 
  CreditCard, 
  Diamond, 
  Clock, 
  Heart, 
  Zap, 
  BookOpen, 
  Users 
} from 'lucide-vue-next'

// Toggle between premium user view and upgrade view
const showUpgradeView = ref(false)
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

.subscriptions-container {
  max-width: 600px;
  margin: 0 auto;
}

/* Premium Banner */
.premium-banner {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #333;
}

.premium-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.premium-header span {
  color: #4CAF50;
  font-weight: 600;
  font-size: 1.1rem;
}

.next-payment {
  color: #ccc;
  margin-bottom: 24px;
  font-size: 0.9rem;
}

.payment-info {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.payment-details {
  flex: 1;
}

.payment-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.payment-line .label {
  color: #999;
}

.payment-line .value {
  color: #fff;
}

.payment-line:last-child {
  margin-top: 8px;
}

.payment-line:last-child .label {
  color: #4CAF50;
  cursor: pointer;
}

/* History Section */
.history-section {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #333;
  margin-bottom: 32px;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.history-header span {
  font-weight: 600;
  font-size: 1.1rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.history-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: #333;
  border-radius: 8px;
}

.payment-card {
  width: 40px;
  height: 32px;
  background: #4CAF50;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-info-history {
  flex: 1;
}

.payment-info-history .payment-line {
  margin-bottom: 4px;
}

/* Upgrade Section */
.upgrade-section {
  background: #2a2a2a;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #333;
  text-align: center;
}

.upgrade-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.upgrade-header span {
  color: #4CAF50;
  font-weight: 600;
  font-size: 1.25rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.benefit-icon {
  width: 48px;
  height: 48px;
  padding: 12px;
  background: #4CAF50;
  border-radius: 12px;
  color: white;
}

.benefit-text h4 {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
}

.upgrade-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.upgrade-btn:hover {
  background: #45a049;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 20px 16px;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .payment-info {
    flex-direction: column;
  }
  
  .history-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>