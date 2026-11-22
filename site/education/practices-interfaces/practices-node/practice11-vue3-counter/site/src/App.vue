<script setup>
import { ref } from 'vue'

// Создаем реактивную переменную со стартовым значением 0
const count = ref(0)

// Переменная для хранения ID таймера
let resetTimer = null

// Функция, которая прибавляет 1
function addOne() {
  count.value++
}

// Функция, которая запускает таймер при наведении
function startResetTimer() {
  // На всякий случай очищаем старый таймер, если он был
  if (resetTimer) clearTimeout(resetTimer)
  
  // Запускаем новый таймер на 1000 мс (1 секунда)
  resetTimer = setTimeout(() => {
    count.value = 0
  }, 1000)
}

// Функция, которая отменяет сброс, если мышка ушла раньше времени
function cancelResetTimer() {
  clearTimeout(resetTimer)
}
</script>

<template>
  <div class="container">
    <h2>Не наводи на меня мышку (дольше 1 сек)!</h2>
    
    <!-- 
      @mouseenter - запускает таймер
      @mouseleave - отменяет таймер 
    -->
    <h1 class="score" @mouseenter="startResetTimer" @mouseleave="cancelResetTimer">
      {{ count }}
    </h1>
    
    <button @click="addOne">
      Кликай сюда (+1)
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

.score {
  font-size: 80px;
  color: #ff4757;
  cursor: crosshair;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  transition: background 0.3s;
}

.score:hover {
  background: #ffeaa7; /* Подсветка зоны сброса */
}

button {
  padding: 15px 30px;
  font-size: 20px;
  background-color: #2ed573;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

button:active {
  transform: translateY(2px);
}
</style>