<template>
  <section class="py-12 bg-gray-50">
    <div class="max-w-[480px] mx-auto container mx-auto px-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">С возвращением!</h2>
          <p class="text-sm text-gray-500">
            Войдите в свой аккаунт для продолжения
          </p>
        </div>

        <!-- Login Form -->
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

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec018c] focus:border-transparent rounded-lg"
              />
            </div>
          </div>

          <!-- Forgot -->
          <div class="text-right">
            <NuxtLink
              to="/passremind"
              class="text-sm text-[#ec018c] hover:text-[#d4007c] font-medium transition-colors"
            >
              Забыли пароль?
            </NuxtLink>
          </div>

          <!-- Error Message -->
          <p
            v-if="errorMessage"
            class="text-sm text-red-500 bg-red-50 py-2 px-4 rounded"
          >
            {{ errorMessage }}
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 bg-[#ec018c] text-white text-sm font-medium rounded-lg hover:bg-[#d4007c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Вход..." : "ВОЙТИ" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">или</span>
          </div>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Нет аккаунта?
            <NuxtLink
              to="/register"
              class="text-[#ec018c] hover:text-[#d4007c] font-medium transition-colors"
            >
              Зарегистрироваться
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const router = useRouter();
const { login, error: authError } = useAuth();

const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = null;

  // Простая валидация
  if (!form.email.trim() || !form.password.trim()) {
    errorMessage.value = "Заполните все поля";
    isLoading.value = false;
    return;
  }

  // Попытка входа
  const success = await login({
    email: form.email,
    password: form.password,
  });

  if (success) {
    // Успешный вход - переход в профиль
    router.push("/profile");
  } else {
    // Ошибка - показываем сообщение
    errorMessage.value = authError.value || "Ошибка при входе";
    isLoading.value = false;
  }
};
</script>
