<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-[480px] mx-auto container mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Восстановление пароля</h2>
          <p class="text-sm text-gray-500">
            Введите email, указанный при регистрации
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Электронная почта
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="example@mail.ru"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="text-sm text-green-600 bg-green-50 py-3 px-4 rounded text-center"
          >
            {{ successMessage }}
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="text-sm text-red-500 bg-red-50 py-3 px-4 rounded text-center"
          >
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Отправка..." : "СБРОСИТЬ ПАРОЛЬ" }}
          </button>
        </form>

        <!-- Back to Login -->
        <div class="text-center mt-8">
          <NuxtLink
            to="/login"
            class="text-sm text-[#ec018c] hover:text-[#d4007c] font-medium transition-colors"
          >
            ← Вернуться ко входу
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const form = reactive({
  email: "",
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  if (!form.email.trim()) {
    errorMessage.value = "Введите адрес электронной почты";
    isLoading.value = false;
    return;
  }

  // TODO: реализовать отправку запроса на восстановление пароля
  // Пока заглушка
  successMessage.value = "Функция восстановления пароля будет доступна позже";
  isLoading.value = false;
};
</script>
