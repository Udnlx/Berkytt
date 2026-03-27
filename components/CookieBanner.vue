<template>
  <transition name="cookie-slide">
    <div
      v-if="isVisible"
      class="fixed bottom-4 left-4 z-50 max-w-sm bg-white shadow-2xl border border-gray-200"
    >
      <!-- Кнопка закрытия (крестик) -->
      <button
        @click="closeBanner"
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
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

      <!-- Контент -->
      <div class="p-4">
        <!-- Текст -->
        <div class="text-xs text-gray-700 leading-relaxed mb-4 pr-4">
          <p>
            Мы используем cookie-файлы, чтобы получить статистику, которая
            помогает нам улучшить сервис для Вас с целью персонализации сервисов
            и предложений. Вы можете прочитать подробнее о cookie-файлах или
            изменить настройки браузера. Продолжая пользоваться сайтом, вы даёте
            согласие на использование ваших cookie-файлов.
          </p>
        </div>

        <!-- Кнопки -->
        <div class="flex gap-2">
          <button
            @click="acceptCookies"
            class="flex-1 py-2 bg-[#ec018c] text-white text-xs font-medium hover:bg-[#d4007c] transition-colors duration-200"
          >
            ПРИНЯТЬ
          </button>

          <a
            href="/soglashenie-na-ispol-zovanie-kuki"
            class="flex-1 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors duration-200 text-center block"
          >
            ИНФОРМАЦИЯ
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);
const COOKIE_ACCEPTED_KEY = "cookies_accepted";

onMounted(() => {
  // Проверяем, принимал ли пользователь cookie ранее
  const isAccepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);

  if (!isAccepted) {
    // Показываем баннер через 2 секунды после загрузки
    setTimeout(() => {
      isVisible.value = true;
    }, 2000);
  }
});

const acceptCookies = () => {
  // Сохраняем согласие в localStorage
  localStorage.setItem(COOKIE_ACCEPTED_KEY, "true");
  isVisible.value = false;
};

const closeBanner = () => {
  // Просто закрываем баннер (без сохранения в localStorage)
  isVisible.value = false;
};
</script>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
