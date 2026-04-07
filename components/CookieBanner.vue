<template>
  <transition name="cookie-slide">
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200"
    >
      <div class="container mx-auto px-4 py-4 sm:py-5">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6"
        >
          <!-- Текст -->
          <div class="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p>
              Мы используем cookie-файлы, чтобы получить статистику, которая
              помогает нам улучшить сервис для Вас с целью персонализации
              сервисов и предложений. Вы можете прочитать подробнее о
              cookie-файлах или изменить настройки браузера. Продолжая
              пользоваться сайтом, вы даёте согласие на использование ваших
              cookie-файлов.
            </p>
          </div>

          <!-- Кнопки -->
          <div class="flex gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              @click="acceptCookies"
              class="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-white text-xs sm:text-sm font-medium rounded-md transition transform hover:scale-105 hover:shadow-lg text-center"
              style="background-color: #ec018c"
            >
              ПРИНЯТЬ
            </button>

            <a
              href="/soglashenie-na-ispol-zovanie-kuki"
              class="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-md transition transform hover:scale-105 hover:shadow-lg text-center"
            >
              ИНФОРМАЦИЯ
            </a>
          </div>
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
</script>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.3s ease-out;
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
}
</style>
