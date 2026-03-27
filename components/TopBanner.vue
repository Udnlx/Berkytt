<template>
  <transition name="slide-down">
    <div
      v-if="isVisible"
      class="fixed top-0 left-0 right-0 z-[999] bg-black text-white h-9 flex items-center justify-center px-4"
    >
      <p class="text-sm text-center">
        🎉 Бесплатная доставка при заказе от 10 000 ₽
      </p>

      <!-- Кнопка закрытия (крестик) -->
      <button
        @click="closeBanner"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const BANNER_CLOSED_KEY = "top_banner_closed";
const BANNER_DELAY_MS = 20 * 60 * 1000; // 20 минут

onMounted(() => {
  // Проверяем, закрывал ли пользователь баннер
  const closedAt = localStorage.getItem(BANNER_CLOSED_KEY);

  if (closedAt) {
    const elapsed = Date.now() - parseInt(closedAt);

    // Если прошло меньше 20 минут, не показываем
    if (elapsed < BANNER_DELAY_MS) {
      return;
    }
  }

  // Показываем баннер через 5 секунд после загрузки
  setTimeout(() => {
    isVisible.value = true;
  }, 5000);
});

const closeBanner = () => {
  // Сохраняем время закрытия
  localStorage.setItem(BANNER_CLOSED_KEY, Date.now().toString());
  isVisible.value = false;
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
